$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Write-Status($Message) {
    Write-Host " $Message"
}

function Write-Success($Message) {
    Write-Host " $Message" -ForegroundColor Green
}

function Write-WarningMessage($Message) {
    Write-Host " $Message" -ForegroundColor Yellow
}

function Write-ErrorMessage($Message) {
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

function Test-CommandExists($Name) {
    return $null -ne (Get-Command $Name -ErrorAction SilentlyContinue)
}

function Get-VersionDate {
    return Get-Date -Format 'yy.MM.dd'
}

function Get-CommitHash {
    if (-not (Test-CommandExists 'git')) {
        Write-WarningMessage "git not found, using 'dev' as commit hash"
        return 'dev'
    }

    $result = & git rev-parse --short HEAD 2>$null
    if ($LASTEXITCODE -ne 0 -or [string]::IsNullOrWhiteSpace($result)) {
        Write-WarningMessage "Not a git repository, using 'dev' as commit hash"
        return 'dev'
    }

    return $result.Trim()
}

function Get-NormalizedRelativePath($BasePath, $FullPath) {
    $normalizedBasePath = [System.IO.Path]::GetFullPath($BasePath)
    if (-not $normalizedBasePath.EndsWith([System.IO.Path]::DirectorySeparatorChar)) {
        $normalizedBasePath += [System.IO.Path]::DirectorySeparatorChar
    }

    $baseUri = New-Object System.Uri($normalizedBasePath)
    $fullUri = New-Object System.Uri([System.IO.Path]::GetFullPath($FullPath))
    return [System.Uri]::UnescapeDataString($baseUri.MakeRelativeUri($fullUri).ToString()).Replace('\', '/')
}

function Check-Dependencies {
    Write-Status 'Checking dependencies...'

    if (-not (Test-CommandExists 'node')) {
        Write-ErrorMessage 'Node.js is not installed'
        exit 1
    }

    if (-not (Test-CommandExists 'npm')) {
        Write-ErrorMessage 'npm is not installed'
        exit 1
    }

    Write-Success 'All dependencies are available'
}

function Install-Dependencies {
    Write-Status 'Installing dependencies...'

    if (Test-Path 'node_modules') {
        Write-Success 'node_modules already present, skipping npm install'
        return
    }

    & npm install
    if ($LASTEXITCODE -ne 0) {
        throw 'npm install failed'
    }

    Write-Success 'Dependencies installed'
}

function Build-Project {
    Write-Status 'Building project...'

    & npm run build
    if ($LASTEXITCODE -ne 0) {
        throw 'npm run build failed'
    }

    Write-Success 'Project built successfully'
}

function Verify-Files {
    Write-Status 'Verifying required files...'

    $missing = @()
    foreach ($path in @('preview.png', 'komari-theme.json', 'dist')) {
        if (-not (Test-Path $path)) {
            $missing += $path
        }
    }

    if ($missing.Count -gt 0) {
        throw ('Missing required files: ' + ($missing -join ', '))
    }

    Write-Success 'All required files found!'
}

function New-ThemePackage {
    Write-Status 'Creating theme package...'

    $versionDate = Get-VersionDate
    $commitHash = Get-CommitHash
    $zipName = "komari-theme-v${versionDate}-${commitHash}.zip"
    $zipPath = Join-Path (Get-Location) $zipName
    $rootPath = (Get-Location).Path
    $sourceFiles = @('komari-theme.json', 'preview.png', 'dist')

    if (Test-Path $zipPath) {
        Remove-Item $zipPath -Force
    }

    Add-Type -AssemblyName System.IO.Compression
    Add-Type -AssemblyName System.IO.Compression.FileSystem
    $zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)
    try {
        foreach ($item in $sourceFiles) {
            $fullPath = Join-Path (Get-Location) $item

            if (Test-Path $fullPath -PathType Container) {
                Get-ChildItem -Path $fullPath -Recurse -File | ForEach-Object {
                    $relative = Get-NormalizedRelativePath $rootPath $_.FullName
                    $entry = $zip.CreateEntry($relative, [System.IO.Compression.CompressionLevel]::Optimal)
                    $entryStream = $entry.Open()
                    try {
                        $fileStream = [System.IO.File]::OpenRead($_.FullName)
                        try {
                            $fileStream.CopyTo($entryStream)
                        } finally {
                            $fileStream.Dispose()
                        }
                    } finally {
										$entryStream.Dispose()
                    }
                }
                continue
            }

            if (Test-Path $fullPath -PathType Leaf) {
				$relative = Get-NormalizedRelativePath $rootPath $fullPath
                $entry = $zip.CreateEntry($relative, [System.IO.Compression.CompressionLevel]::Optimal)
                $entryStream = $entry.Open()
                try {
                    $fileStream = [System.IO.File]::OpenRead($fullPath)
                    try {
                        $fileStream.CopyTo($entryStream)
                    } finally {
                        $fileStream.Dispose()
                    }
                } finally {
                    $entryStream.Dispose()
                }
            }
        }
    } finally {
        $zip.Dispose()
    }

    $verify = [System.IO.Compression.ZipFile]::OpenRead($zipPath)
    try {
        $entryNames = @($verify.Entries | ForEach-Object { $_.FullName })
        if (-not ($entryNames -contains 'dist/index.html')) {
            throw 'Generated ZIP is invalid: missing dist/index.html'
        }
        if ($entryNames | Where-Object { $_ -like '*\*' }) {
            throw 'Generated ZIP is invalid: archive contains Windows backslash paths'
        }
    } finally {
        $verify.Dispose()
    }

    Write-Success "Created package: $zipName"
    Get-Item $zipPath | Format-Table Name, Length, LastWriteTime -AutoSize
}

Push-Location $PSScriptRoot
try {
    Write-Host '======================================'
    Write-Host '  Komari Theme Package Builder'
    Write-Host '======================================'
    Write-Host

    Check-Dependencies
    Write-Host

    Install-Dependencies
    Write-Host

    Build-Project
    Write-Host

    Verify-Files
    Write-Host

    New-ThemePackage
    Write-Host

    Write-Success 'Theme package build completed!'
    Write-Host
    Write-Host 'You can now upload the generated ZIP file to Komari.'
} finally {
    Pop-Location
}