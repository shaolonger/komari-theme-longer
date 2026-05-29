// 地区emoji到名称的映射
export const emojiToRegionMap: Record<string, { en: string; zh: string; aliases: string[]; coordinates?: [number, number] }> = {
  '🇭🇰': {
    en: 'Hong Kong',
    zh: '香港',
    aliases: ['hk', 'hongkong', 'hong kong', '香港', 'HK'],
    coordinates: [22.3193, 114.1694]
  },
  '🇲🇴': {
    en: 'Macau',
    zh: '澳门',
    aliases: ['mo', 'macao', 'macau', '澳门', '澳門', 'MO'],
    coordinates: [22.1987, 113.5439]
  },
  '🇨🇳': {
    en: 'China',
    zh: '中国',
    aliases: ['cn', 'china', '中国', '中华人民共和国', 'prc', 'CN'],
    coordinates: [39.9042, 116.4074]
  },
  '🇺🇸': {
    en: 'United States',
    zh: '美国',
    aliases: ['us', 'usa', 'united states', 'america', '美国', '美利坚', 'US', 'USA'],
    coordinates: [37.0902, -95.7129]
  },
  '🇯🇵': {
    en: 'Japan',
    zh: '日本',
    aliases: ['jp', 'japan', '日本', 'JP'],
    coordinates: [35.6762, 139.6503]
  },
  '🇰🇷': {
    en: 'South Korea',
    zh: '韩国',
    aliases: ['kr', 'korea', 'south korea', '韩国', '南韩', 'KR'],
    coordinates: [37.5665, 126.9780]
  },
  '🇸🇬': {
    en: 'Singapore',
    zh: '新加坡',
    aliases: ['sg', 'singapore', '新加坡', 'SG'],
    coordinates: [1.3521, 103.8198]
  },
  '🇹🇼': {
    en: 'Taiwan',
    zh: '台湾',
    aliases: ['tw', 'taiwan', '台湾', '台灣', 'TW'],
    coordinates: [25.0330, 121.5654]
  },
  '🇬🇧': {
    en: 'United Kingdom',
    zh: '英国',
    aliases: ['gb', 'uk', 'united kingdom', 'britain', '英国', '英國', 'GB', 'UK'],
    coordinates: [51.5074, -0.1278]
  },
  '🇩🇪': {
    en: 'Germany',
    zh: '德国',
    aliases: ['de', 'germany', 'deutschland', '德国', '德國', 'DE'],
    coordinates: [52.5200, 13.4050]
  },
  '🇫🇷': {
    en: 'France',
    zh: '法国',
    aliases: ['fr', 'france', '法国', '法國', 'FR'],
    coordinates: [48.8566, 2.3522]
  },
  '🇨🇦': {
    en: 'Canada',
    zh: '加拿大',
    aliases: ['ca', 'canada', '加拿大', 'CA'],
    coordinates: [45.4215, -75.6972]
  },
  '🇦🇺': {
    en: 'Australia',
    zh: '澳大利亚',
    aliases: ['au', 'australia', '澳大利亚', '澳洲', 'AU'],
    coordinates: [-33.8688, 151.2093]
  },
  '🇷🇺': {
    en: 'Russia',
    zh: '俄罗斯',
    aliases: ['ru', 'russia', '俄罗斯', '俄國', 'RU'],
    coordinates: [55.7558, 37.6173]
  },
  '🇮🇳': {
    en: 'India',
    zh: '印度',
    aliases: ['in', 'india', '印度', 'IN'],
    coordinates: [28.6139, 77.2090]
  },
  '🇧🇷': {
    en: 'Brazil',
    zh: '巴西',
    aliases: ['br', 'brazil', '巴西', 'BR'],
    coordinates: [-15.8267, -47.9218]
  },
  '🇳🇱': {
    en: 'Netherlands',
    zh: '荷兰',
    aliases: ['nl', 'netherlands', 'holland', '荷兰', '荷蘭', 'NL'],
    coordinates: [52.3676, 4.9041]
  },
  '🇮🇹': {
    en: 'Italy',
    zh: '意大利',
    aliases: ['it', 'italy', '意大利', 'IT'],
    coordinates: [41.9028, 12.4964]
  },
  '🇪🇸': {
    en: 'Spain',
    zh: '西班牙',
    aliases: ['es', 'spain', '西班牙', 'ES'],
    coordinates: [40.4168, -3.7038]
  },
  '🇸🇪': {
    en: 'Sweden',
    zh: '瑞典',
    aliases: ['se', 'sweden', '瑞典', 'SE'],
    coordinates: [59.3293, 18.0686]
  },
  '🇳🇴': {
    en: 'Norway',
    zh: '挪威',
    aliases: ['no', 'norway', '挪威', 'NO'],
    coordinates: [59.9139, 10.7522]
  },
  '🇫🇮': {
    en: 'Finland',
    zh: '芬兰',
    aliases: ['fi', 'finland', '芬兰', '芬蘭', 'FI'],
    coordinates: [60.1699, 24.9384]
  },
  '🇨🇭': {
    en: 'Switzerland',
    zh: '瑞士',
    aliases: ['ch', 'switzerland', '瑞士', 'CH'],
    coordinates: [46.9479, 7.4474]
  },
  '🇦🇹': {
    en: 'Austria',
    zh: '奥地利',
    aliases: ['at', 'austria', '奥地利', '奧地利', 'AT'],
    coordinates: [48.2082, 16.3738]
  },
  '🇧🇪': {
    en: 'Belgium',
    zh: '比利时',
    aliases: ['be', 'belgium', '比利时', '比利時', 'BE'],
    coordinates: [50.8503, 4.3517]
  },
  '🇵🇹': {
    en: 'Portugal',
    zh: '葡萄牙',
    aliases: ['pt', 'portugal', '葡萄牙', 'PT'],
    coordinates: [38.7223, -9.1393]
  },
  '🇬🇷': {
    en: 'Greece',
    zh: '希腊',
    aliases: ['gr', 'greece', '希腊', '希臘', 'GR'],
    coordinates: [37.9838, 23.7275]
  },
  '🇹🇷': {
    en: 'Turkey',
    zh: '土耳其',
    aliases: ['tr', 'turkey', '土耳其', 'TR'],
    coordinates: [39.9334, 32.8597]
  },
  '🇵🇱': {
    en: 'Poland',
    zh: '波兰',
    aliases: ['pl', 'poland', '波兰', '波蘭', 'PL'],
    coordinates: [52.2297, 21.0122]
  },
  '🇨🇿': {
    en: 'Czech Republic',
    zh: '捷克',
    aliases: ['cz', 'czech', 'czech republic', '捷克', 'CZ'],
    coordinates: [50.0755, 14.4378]
  },
  '🇭🇺': {
    en: 'Hungary',
    zh: '匈牙利',
    aliases: ['hu', 'hungary', '匈牙利', 'HU'],
    coordinates: [47.4979, 19.0402]
  },
  '🇷🇴': {
    en: 'Romania',
    zh: '罗马尼亚',
    aliases: ['ro', 'romania', '罗马尼亚', '羅馬尼亞', 'RO'],
    coordinates: [44.4268, 26.1025]
  },
  '🇧🇬': {
    en: 'Bulgaria',
    zh: '保加利亚',
    aliases: ['bg', 'bulgaria', '保加利亚', '保加利亞', 'BG'],
    coordinates: [42.6977, 23.3219]
  },
  '🇭🇷': {
    en: 'Croatia',
    zh: '克罗地亚',
    aliases: ['hr', 'croatia', '克罗地亚', '克羅地亞', 'HR'],
    coordinates: [45.8150, 15.9819]
  },
  '🇸🇮': {
    en: 'Slovenia',
    zh: '斯洛文尼亚',
    aliases: ['si', 'slovenia', '斯洛文尼亚', '斯洛文尼亞', 'SI'],
    coordinates: [46.0569, 14.5058]
  },
  '🇸🇰': {
    en: 'Slovakia',
    zh: '斯洛伐克',
    aliases: ['sk', 'slovakia', '斯洛伐克', 'SK'],
    coordinates: [48.1486, 17.1077]
  },
  '🇱🇻': {
    en: 'Latvia',
    zh: '拉脱维亚',
    aliases: ['lv', 'latvia', '拉脱维亚', '拉脫維亞', 'LV'],
    coordinates: [56.9496, 24.1052]
  },
  '🇱🇹': {
    en: 'Lithuania',
    zh: '立陶宛',
    aliases: ['lt', 'lithuania', '立陶宛', 'LT'],
    coordinates: [54.6872, 25.2797]
  },
  '🇪🇪': {
    en: 'Estonia',
    zh: '爱沙尼亚',
    aliases: ['ee', 'estonia', '爱沙尼亚', '愛沙尼亞', 'EE'],
    coordinates: [59.4370, 24.7536]
  },
  '🇲🇽': {
    en: 'Mexico',
    zh: '墨西哥',
    aliases: ['mx', 'mexico', '墨西哥', 'MX'],
    coordinates: [19.4326, -99.1332]
  },
  '🇦🇷': {
    en: 'Argentina',
    zh: '阿根廷',
    aliases: ['ar', 'argentina', '阿根廷', 'AR'],
    coordinates: [-34.6037, -58.3816]
  },
  '🇨🇱': {
    en: 'Chile',
    zh: '智利',
    aliases: ['cl', 'chile', '智利', 'CL'],
    coordinates: [-33.4489, -70.6693]
  },
  '🇨🇴': {
    en: 'Colombia',
    zh: '哥伦比亚',
    aliases: ['co', 'colombia', '哥伦比亚', '哥倫比亞', 'CO'],
    coordinates: [4.7110, -74.0721]
  },
  '🇵🇪': {
    en: 'Peru',
    zh: '秘鲁',
    aliases: ['pe', 'peru', '秘鲁', '秘魯', 'PE'],
    coordinates: [-12.0464, -77.0428]
  },
  '🇻🇪': {
    en: 'Venezuela',
    zh: '委内瑞拉',
    aliases: ['ve', 'venezuela', '委内瑞拉', '委內瑞拉', 'VE'],
    coordinates: [10.4806, -66.9036]
  },
  '🇺🇾': {
    en: 'Uruguay',
    zh: '乌拉圭',
    aliases: ['uy', 'uruguay', '乌拉圭', '烏拉圭', 'UY'],
    coordinates: [-34.9011, -56.1645]
  },
  '🇪🇨': {
    en: 'Ecuador',
    zh: '厄瓜多尔',
    aliases: ['ec', 'ecuador', '厄瓜多尔', '厄瓜多爾', 'EC'],
    coordinates: [-0.1807, -78.4678]
  },
  '🇧🇴': {
    en: 'Bolivia',
    zh: '玻利维亚',
    aliases: ['bo', 'bolivia', '玻利维亚', '玻利維亞', 'BO'],
    coordinates: [-16.2902, -63.5887]
  },
  '🇵🇾': {
    en: 'Paraguay',
    zh: '巴拉圭',
    aliases: ['py', 'paraguay', '巴拉圭', 'PY'],
    coordinates: [-25.2637, -57.5759]
  },
  '🇬🇾': {
    en: 'Guyana',
    zh: '圭亚那',
    aliases: ['gy', 'guyana', '圭亚那', '圭亞那', 'GY'],
    coordinates: [6.8013, -58.1551]
  },
  '🇸🇷': {
    en: 'Suriname',
    zh: '苏里南',
    aliases: ['sr', 'suriname', '苏里南', '蘇里南', 'SR'],
    coordinates: [5.8520, -55.2038]
  },
  '🇫🇰': {
    en: 'Falkland Islands',
    zh: '福克兰群岛',
    aliases: ['fk', 'falkland', '福克兰', '福克蘭', 'FK'],
    coordinates: [-51.7963, -59.5236]
  },
  '🇬🇫': {
    en: 'French Guiana',
    zh: '法属圭亚那',
    aliases: ['gf', 'french guiana', '法属圭亚那', '法屬圭亞那', 'GF'],
    coordinates: [4.9371, -52.3260]
  },
  '🇵🇦': {
    en: 'Panama',
    zh: '巴拿马',
    aliases: ['pa', 'panama', '巴拿马', '巴拿馬', 'PA'],
    coordinates: [8.9824, -79.5199]
  },
  '🇨🇷': {
    en: 'Costa Rica',
    zh: '哥斯达黎加',
    aliases: ['cr', 'costa rica', '哥斯达黎加', '哥斯達黎加', 'CR'],
    coordinates: [9.9281, -84.0907]
  },
  '🇳🇮': {
    en: 'Nicaragua',
    zh: '尼加拉瓜',
    aliases: ['ni', 'nicaragua', '尼加拉瓜', 'NI'],
    coordinates: [12.1149, -86.2362]
  },
  '🇭🇳': {
    en: 'Honduras',
    zh: '洪都拉斯',
    aliases: ['hn', 'honduras', '洪都拉斯', 'HN'],
    coordinates: [14.0723, -87.1921]
  },
  '🇬🇹': {
    en: 'Guatemala',
    zh: '危地马拉',
    aliases: ['gt', 'guatemala', '危地马拉', '危地馬拉', 'GT'],
    coordinates: [14.6349, -90.5069]
  },
  '🇧🇿': {
    en: 'Belize',
    zh: '伯利兹',
    aliases: ['bz', 'belize', '伯利兹', '伯利茲', 'BZ'],
    coordinates: [17.1899, -88.4976]
  },
  '🇸🇻': {
    en: 'El Salvador',
    zh: '萨尔瓦多',
    aliases: ['sv', 'el salvador', '萨尔瓦多', '薩爾瓦多', 'SV'],
    coordinates: [13.6929, -89.2182]
  },
  '🇯🇲': {
    en: 'Jamaica',
    zh: '牙买加',
    aliases: ['jm', 'jamaica', '牙买加', '牙買加', 'JM'],
    coordinates: [18.1096, -77.2975]
  },
  '🇨🇺': {
    en: 'Cuba',
    zh: '古巴',
    aliases: ['cu', 'cuba', '古巴', 'CU'],
    coordinates: [23.1136, -82.3666]
  },
  '🇩🇴': {
    en: 'Dominican Republic',
    zh: '多米尼加共和国',
    aliases: ['do', 'dominican republic', '多米尼加共和国', '多明尼加', 'DO'],
    coordinates: [18.4861, -69.9312]
  },
  '🇭🇹': {
    en: 'Haiti',
    zh: '海地',
    aliases: ['ht', 'haiti', '海地', 'HT'],
    coordinates: [18.5944, -72.3074]
  },
  '🇧🇸': {
    en: 'Bahamas',
    zh: '巴哈马',
    aliases: ['bs', 'bahamas', '巴哈马', '巴哈馬', 'BS'],
    coordinates: [25.0343, -77.3963]
  },
  '🇧🇧': {
    en: 'Barbados',
    zh: '巴巴多斯',
    aliases: ['bb', 'barbados', '巴巴多斯', 'BB'],
    coordinates: [13.1939, -59.5432]
  },
  '🇹🇹': {
    en: 'Trinidad and Tobago',
    zh: '特立尼达和多巴哥',
    aliases: ['tt', 'trinidad', '特立尼达', '特立尼達', 'TT'],
    coordinates: [10.6918, -61.2225]
  },
  '🇵🇭': {
    en: 'Philippines',
    zh: '菲律宾',
    aliases: ['ph', 'philippines', '菲律宾', '菲律賓', 'PH'],
    coordinates: [14.5995, 120.9842]
  },
  '🇹🇭': {
    en: 'Thailand',
    zh: '泰国',
    aliases: ['th', 'thailand', '泰国', '泰國', 'TH'],
    coordinates: [13.7563, 100.5018]
  },
  '🇻🇳': {
    en: 'Vietnam',
    zh: '越南',
    aliases: ['vn', 'vietnam', '越南', 'VN'],
    coordinates: [21.0285, 105.8542]
  },
  '🇲🇾': {
    en: 'Malaysia',
    zh: '马来西亚',
    aliases: ['my', 'malaysia', '马来西亚', '馬來西亞', 'MY'],
    coordinates: [3.1390, 101.6869]
  },
  '🇮🇩': {
    en: 'Indonesia',
    zh: '印度尼西亚',
    aliases: ['id', 'indonesia', '印度尼西亚', '印尼', 'ID'],
    coordinates: [-6.2088, 106.8456]
  },
  '🇱🇦': {
    en: 'Laos',
    zh: '老挝',
    aliases: ['la', 'laos', '老挝', '老撾', 'LA'],
    coordinates: [17.9757, 102.6331]
  },
  '🇰🇭': {
    en: 'Cambodia',
    zh: '柬埔寨',
    aliases: ['kh', 'cambodia', '柬埔寨', 'KH'],
    coordinates: [11.5449, 104.8922]
  },
  '🇲🇲': {
    en: 'Myanmar',
    zh: '缅甸',
    aliases: ['mm', 'myanmar', 'burma', '缅甸', '緬甸', 'MM'],
    coordinates: [16.8661, 96.1951]
  },
  '🇧🇳': {
    en: 'Brunei',
    zh: '文莱',
    aliases: ['bn', 'brunei', '文莱', '汶萊', 'BN'],
    coordinates: [4.5353, 114.7277]
  },
  '🇪🇬': {
    en: 'Egypt',
    zh: '埃及',
    aliases: ['eg', 'egypt', '埃及', 'EG'],
    coordinates: [30.0444, 31.2357]
  },
  '🇿🇦': {
    en: 'South Africa',
    zh: '南非',
    aliases: ['za', 'south africa', '南非', 'ZA'],
    coordinates: [-25.7479, 28.2293]
  },
  '🇳🇬': {
    en: 'Nigeria',
    zh: '尼日利亚',
    aliases: ['ng', 'nigeria', '尼日利亚', '尼日利亞', 'NG'],
    coordinates: [9.0820, 8.6753]
  },
  '🇰🇪': {
    en: 'Kenya',
    zh: '肯尼亚',
    aliases: ['ke', 'kenya', '肯尼亚', '肯亞', 'KE'],
    coordinates: [-1.2921, 36.8219]
  },
  '🇪🇹': {
    en: 'Ethiopia',
    zh: '埃塞俄比亚',
    aliases: ['et', 'ethiopia', '埃塞俄比亚', '埃塞俄比亞', 'ET'],
    coordinates: [9.0300, 38.7400]
  },
  '🇬🇭': {
    en: 'Ghana',
    zh: '加纳',
    aliases: ['gh', 'ghana', '加纳', '迦納', 'GH'],
    coordinates: [5.6037, -0.1870]
  },
  '🇺🇬': {
    en: 'Uganda',
    zh: '乌干达',
    aliases: ['ug', 'uganda', '乌干达', '烏干達', 'UG'],
    coordinates: [0.3476, 32.5825]
  },
  '🇹🇿': {
    en: 'Tanzania',
    zh: '坦桑尼亚',
    aliases: ['tz', 'tanzania', '坦桑尼亚', '坦尚尼亞', 'TZ'],
    coordinates: [-6.7924, 39.2083]
  },
  '🇷🇼': {
    en: 'Rwanda',
    zh: '卢旺达',
    aliases: ['rw', 'rwanda', '卢旺达', '盧旺達', 'RW'],
    coordinates: [-1.9403, 29.8739]
  },
  '🇿🇼': {
    en: 'Zimbabwe',
    zh: '津巴布韦',
    aliases: ['zw', 'zimbabwe', '津巴布韦', '辛巴威', 'ZW'],
    coordinates: [-17.8292, 31.0539]
  },
  '🇿🇲': {
    en: 'Zambia',
    zh: '赞比亚',
    aliases: ['zm', 'zambia', '赞比亚', '尚比亞', 'ZM'],
    coordinates: [-15.3875, 28.3228]
  },
  '🇧🇼': {
    en: 'Botswana',
    zh: '博茨瓦纳',
    aliases: ['bw', 'botswana', '博茨瓦纳', '波札那', 'BW'],
    coordinates: [-24.6282, 25.9231]
  },
  '🇳🇦': {
    en: 'Namibia',
    zh: '纳米比亚',
    aliases: ['na', 'namibia', '纳米比亚', '納米比亞', 'NA'],
    coordinates: [-22.5597, 17.0658]
  },
  '🇲🇦': {
    en: 'Morocco',
    zh: '摩洛哥',
    aliases: ['ma', 'morocco', '摩洛哥', 'MA'],
    coordinates: [33.9716, -6.8498]
  },
  '🇩🇿': {
    en: 'Algeria',
    zh: '阿尔及利亚',
    aliases: ['dz', 'algeria', '阿尔及利亚', '阿爾及利亞', 'DZ'],
    coordinates: [36.7372, 3.0866]
  },
  '🇹🇳': {
    en: 'Tunisia',
    zh: '突尼斯',
    aliases: ['tn', 'tunisia', '突尼斯', 'TN'],
    coordinates: [36.8065, 10.1815]
  },
  '🇱🇾': {
    en: 'Libya',
    zh: '利比亚',
    aliases: ['ly', 'libya', '利比亚', '利比亞', 'LY'],
    coordinates: [32.8872, 13.1913]
  },
  '🇸🇩': {
    en: 'Sudan',
    zh: '苏丹',
    aliases: ['sd', 'sudan', '苏丹', '蘇丹', 'SD'],
    coordinates: [15.5007, 32.5599]
  },
  '🇸🇸': {
    en: 'South Sudan',
    zh: '南苏丹',
    aliases: ['ss', 'south sudan', '南苏丹', '南蘇丹', 'SS'],
    coordinates: [4.8517, 31.5825]
  },
  '🇨🇩': {
    en: 'Democratic Republic of Congo',
    zh: '刚果民主共和国',
    aliases: ['cd', 'drc', 'dr congo', '刚果民主共和国', '刚果（金）', '剛果民主共和國', '民主刚果', 'CD'],
    coordinates: [-4.4419, 15.2663]
  },
  '🇨🇬': {
    en: 'Republic of Congo',
    zh: '刚果共和国',
    aliases: ['cg', 'congo-brazzaville', '刚果共和国', '刚果（布）', '剛果共和國', 'CG'],
    coordinates: [-4.2634, 15.2429]
  },
  '🇨🇫': {
    en: 'Central African Republic',
    zh: '中非共和国',
    aliases: ['cf', 'central african', '中非', 'CF'],
    coordinates: [4.3947, 18.5582]
  },
  '🇨🇲': {
    en: 'Cameroon',
    zh: '喀麦隆',
    aliases: ['cm', 'cameroon', '喀麦隆', '喀麥隆', 'CM'],
    coordinates: [3.8480, 11.5021]
  },
  '🇹🇩': {
    en: 'Chad',
    zh: '乍得',
    aliases: ['td', 'chad', '乍得', 'TD'],
    coordinates: [12.1348, 15.0557]
  },
  '🇳🇪': {
    en: 'Niger',
    zh: '尼日尔',
    aliases: ['ne', 'niger', '尼日尔', '尼日爾', 'NE'],
    coordinates: [13.5117, 2.1098]
  },
  '🇲🇱': {
    en: 'Mali',
    zh: '马里',
    aliases: ['ml', 'mali', '马里', '馬利', 'ML'],
    coordinates: [12.6392, -8.0029]
  },
  '🇧🇫': {
    en: 'Burkina Faso',
    zh: '布基纳法索',
    aliases: ['bf', 'burkina', '布基纳法索', '布吉納法索', 'BF'],
    coordinates: [12.3714, -1.5197]
  },
  '🇸🇳': {
    en: 'Senegal',
    zh: '塞内加尔',
    aliases: ['sn', 'senegal', '塞内加尔', '塞內加爾', 'SN'],
    coordinates: [14.6928, -17.4467]
  },
  '🇬🇲': {
    en: 'Gambia',
    zh: '冈比亚',
    aliases: ['gm', 'gambia', '冈比亚', '甘比亞', 'GM'],
    coordinates: [13.4432, -16.5775]
  },
  '🇬🇼': {
    en: 'Guinea-Bissau',
    zh: '几内亚比绍',
    aliases: ['gw', 'guinea-bissau', '几内亚比绍', '幾內亞比索', 'GW'],
    coordinates: [11.8037, -15.1804]
  },
  '🇬🇳': {
    en: 'Guinea',
    zh: '几内亚',
    aliases: ['gn', 'guinea', '几内亚', '幾內亞', 'GN'],
    coordinates: [9.6412, -13.5784]
  },
  '🇸🇱': {
    en: 'Sierra Leone',
    zh: '塞拉利昂',
    aliases: ['sl', 'sierra leone', '塞拉利昂', 'SL'],
    coordinates: [8.4606, -13.2317]
  },
  '🇱🇷': {
    en: 'Liberia',
    zh: '利比里亚',
    aliases: ['lr', 'liberia', '利比里亚', '賴比瑞亞', 'LR'],
    coordinates: [6.2907, -10.7605]
  },
  '🇨🇮': {
    en: 'Ivory Coast',
    zh: '科特迪瓦',
    aliases: ['ci', 'ivory coast', '科特迪瓦', '象牙海岸', 'CI'],
    coordinates: [5.3600, -4.0083]
  },
  '🇹🇬': {
    en: 'Togo',
    zh: '多哥',
    aliases: ['tg', 'togo', '多哥', 'TG'],
    coordinates: [6.1375, 1.2123]
  },
  '🇧🇯': {
    en: 'Benin',
    zh: '贝宁',
    aliases: ['bj', 'benin', '贝宁', '貝寧', 'BJ'],
    coordinates: [6.3703, 2.3912]
  },
  '🇦🇨': {
    en: 'Ascension Island',
    zh: '阿森松岛',
    aliases: ['ac', 'ascension', '阿森松岛', 'AC'],
    coordinates: [-7.9467, -14.3559]
  },
  '🇦🇩': {
    en: 'Andorra',
    zh: '安道尔',
    aliases: ['ad', 'andorra', '安道尔', 'AD'],
    coordinates: [42.5063, 1.5218]
  },
  '🇦🇪': {
    en: 'United Arab Emirates',
    zh: '阿联酋',
    aliases: ['ae', 'uae', 'emirates', '阿联酋', '阿拉伯联合酋长国', 'AE', 'UAE'],
    coordinates: [24.4539, 54.3773]
  },
  '🇦🇫': {
    en: 'Afghanistan',
    zh: '阿富汗',
    aliases: ['af', 'afghanistan', '阿富汗', 'AF'],
    coordinates: [34.5553, 69.2075]
  },
  '🇦🇬': {
    en: 'Antigua and Barbuda',
    zh: '安提瓜和巴布达',
    aliases: ['ag', 'antigua', '安提瓜', '安地卡及巴布達', 'AG'],
    coordinates: [17.0608, -61.7964]
  },
  '🇦🇮': {
    en: 'Anguilla',
    zh: '安圭拉',
    aliases: ['ai', 'anguilla', '安圭拉', 'AI'],
    coordinates: [18.2206, -63.0686]
  },
  '🇦🇱': {
    en: 'Albania',
    zh: '阿尔巴尼亚',
    aliases: ['al', 'albania', '阿尔巴尼亚', '阿爾巴尼亞', 'AL'],
    coordinates: [41.3275, 19.8187]
  },
  '🇦🇲': {
    en: 'Armenia',
    zh: '亚美尼亚',
    aliases: ['am', 'armenia', '亚美尼亚', '亞美尼亞', 'AM'],
    coordinates: [40.1792, 44.4991]
  },
  '🇦🇴': {
    en: 'Angola',
    zh: '安哥拉',
    aliases: ['ao', 'angola', '安哥拉', 'AO'],
    coordinates: [-8.8390, 13.2894]
  },
  '🇦🇶': {
    en: 'Antarctica',
    zh: '南极洲',
    aliases: ['aq', 'antarctica', '南极洲', '南極洲', 'AQ'],
    coordinates: [-90.0000, 0.0000]
  },
  '🇦🇸': {
    en: 'American Samoa',
    zh: '美属萨摩亚',
    aliases: ['as', 'american samoa', '美属萨摩亚', '美屬薩摩亞', 'AS'],
    coordinates: [-14.2710, -170.1322]
  },
  '🇦🇼': {
    en: 'Aruba',
    zh: '阿鲁巴',
    aliases: ['aw', 'aruba', '阿鲁巴', '阿魯巴', 'AW'],
    coordinates: [12.5211, -69.9683]
  },
  '🇦🇽': {
    en: 'Åland Islands',
    zh: '奥兰群岛',
    aliases: ['ax', 'aland', '奥兰', '奧蘭', 'AX'],
    coordinates: [60.1785, 20.2173]
  },
  '🇦🇿': {
    en: 'Azerbaijan',
    zh: '阿塞拜疆',
    aliases: ['az', 'azerbaijan', '阿塞拜疆', '亞塞拜然', 'AZ'],
    coordinates: [40.4093, 49.8671]
  },
  '🇧🇦': {
    en: 'Bosnia and Herzegovina',
    zh: '波黑',
    aliases: ['ba', 'bosnia', '波黑', '波士尼亞與赫塞哥維納', 'BA'],
    coordinates: [43.8563, 18.4131]
  },
  '🇧🇩': {
    en: 'Bangladesh',
    zh: '孟加拉国',
    aliases: ['bd', 'bangladesh', '孟加拉', '孟加拉國', 'BD'],
    coordinates: [23.8103, 90.4125]
  },
  '🇧🇭': {
    en: 'Bahrain',
    zh: '巴林',
    aliases: ['bh', 'bahrain', '巴林', 'BH'],
    coordinates: [26.2235, 50.5830]
  },
  '🇧🇮': {
    en: 'Burundi',
    zh: '布隆迪',
    aliases: ['bi', 'burundi', '布隆迪', '蒲隆地', 'BI'],
    coordinates: [-3.3731, 29.9189]
  },
  '🇧🇱': {
    en: 'Saint Barthélemy',
    zh: '圣巴泰勒米',
    aliases: ['bl', 'st barts', '圣巴泰勒米', '聖巴瑟米', 'BL'],
    coordinates: [17.9000, -62.8333]
  },
  '🇧🇲': {
    en: 'Bermuda',
    zh: '百慕大',
    aliases: ['bm', 'bermuda', '百慕大', 'BM'],
    coordinates: [32.3078, -64.7505]
  },
  '🇧🇶': {
    en: 'Caribbean Netherlands',
    zh: '荷兰加勒比区',
    aliases: ['bq', 'bonaire', '荷兰加勒比', '荷屬加勒比', 'BQ'],
    coordinates: [12.2019, -68.2625]
  },
  '🇧🇹': {
    en: 'Bhutan',
    zh: '不丹',
    aliases: ['bt', 'bhutan', '不丹', 'BT'],
    coordinates: [27.5142, 90.4336]
  },
  '🇧🇻': {
    en: 'Bouvet Island',
    zh: '布韦岛',
    aliases: ['bv', 'bouvet', '布韦岛', '布威島', 'BV'],
    coordinates: [-54.4208, 3.3464]
  },
  '🇧🇾': {
    en: 'Belarus',
    zh: '白俄罗斯',
    aliases: ['by', 'belarus', '白俄罗斯', '白俄羅斯', 'BY'],
    coordinates: [53.9045, 27.5615]
  },
  '🇨🇨': {
    en: 'Cocos Islands',
    zh: '科科斯群岛',
    aliases: ['cc', 'cocos', '科科斯', 'CC'],
    coordinates: [-12.1642, 96.8710]
  },
  '🇨🇰': {
    en: 'Cook Islands',
    zh: '库克群岛',
    aliases: ['ck', 'cook', '库克', '庫克', 'CK'],
    coordinates: [-21.2367, -159.7777]
  },
  '🇨🇵': {
    en: 'Clipperton Island',
    zh: '克利珀顿岛',
    aliases: ['cp', 'clipperton', '克利珀顿', 'CP'],
    coordinates: [10.3000, -109.2167]
  },
  '🇨🇻': {
    en: 'Cape Verde',
    zh: '佛得角',
    aliases: ['cv', 'cape verde', '佛得角', '維德角', 'CV'],
    coordinates: [16.5388, -23.0418]
  },
  '🇨🇼': {
    en: 'Curaçao',
    zh: '库拉索',
    aliases: ['cw', 'curacao', '库拉索', '庫拉索', 'CW'],
    coordinates: [12.1696, -68.9900]
  },
  '🇨🇽': {
    en: 'Christmas Island',
    zh: '圣诞岛',
    aliases: ['cx', 'christmas', '圣诞岛', '聖誕島', 'CX'],
    coordinates: [-10.4475, 105.6904]
  },
  '🇨🇾': {
    en: 'Cyprus',
    zh: '塞浦路斯',
    aliases: ['cy', 'cyprus', '塞浦路斯', '賽普勒斯', 'CY'],
    coordinates: [35.1264, 33.4299]
  },
  '🇩🇬': {
    en: 'Diego Garcia',
    zh: '迪戈加西亚岛',
    aliases: ['dg', 'diego garcia', '迪戈加西亚', 'DG'],
    coordinates: [-7.3195, 72.4229]
  },
  '🇩🇯': {
    en: 'Djibouti',
    zh: '吉布提',
    aliases: ['dj', 'djibouti', '吉布提', '吉布地', 'DJ'],
    coordinates: [11.5721, 43.1456]
  },
  '🇩🇰': {
    en: 'Denmark',
    zh: '丹麦',
    aliases: ['dk', 'denmark', '丹麦', '丹麥', 'DK'],
    coordinates: [55.6761, 12.5683]
  },
  '🇩🇲': {
    en: 'Dominica',
    zh: '多米尼克',
    aliases: ['dm', 'dominica', '多米尼克', 'DM'],
    coordinates: [15.4150, -61.3710]
  },
  '🇪🇦': {
    en: 'Ceuta & Melilla',
    zh: '休达与梅利利亚',
    aliases: ['ea', 'ceuta melilla', '休达', '休達', 'EA'],
    coordinates: [35.8894, -5.3213]
  },
  '🇪🇭': {
    en: 'Western Sahara',
    zh: '西撒哈拉',
    aliases: ['eh', 'western sahara', '西撒哈拉', 'EH'],
    coordinates: [24.2155, -12.8858]
  },
  '🇪🇷': {
    en: 'Eritrea',
    zh: '厄立特里亚',
    aliases: ['er', 'eritrea', '厄立特里亚', '厄利垂亞', 'ER'],
    coordinates: [15.3229, 38.9251]
  },
  '🇪🇺': {
    en: 'European Union',
    zh: '欧盟',
    aliases: ['eu', 'europe', '欧盟', '歐盟', 'EU'],
    coordinates: [50.8503, 4.3517]
  },
  '🇫🇯': {
    en: 'Fiji',
    zh: '斐济',
    aliases: ['fj', 'fiji', '斐济', '斐濟', 'FJ'],
    coordinates: [-18.1248, 178.4501]
  },
  '🇫🇲': {
    en: 'Micronesia',
    zh: '密克罗尼西亚',
    aliases: ['fm', 'micronesia', '密克罗尼西亚', '密克羅尼西亞', 'FM'],
    coordinates: [6.9248, 158.1611]
  },
  '🇫🇴': {
    en: 'Faroe Islands',
    zh: '法罗群岛',
    aliases: ['fo', 'faroe', '法罗', '法羅', 'FO'],
    coordinates: [62.0079, -6.7541]
  },
  '🇬🇦': {
    en: 'Gabon',
    zh: '加蓬',
    aliases: ['ga', 'gabon', '加蓬', '加彭', 'GA'],
    coordinates: [0.3924, 9.4553]
  },
  '🇬🇩': {
    en: 'Grenada',
    zh: '格林纳达',
    aliases: ['gd', 'grenada', '格林纳达', '格瑞那達', 'GD'],
    coordinates: [12.1165, -61.6790]
  },
  '🇬🇪': {
    en: 'Georgia',
    zh: '格鲁吉亚',
    aliases: ['ge', 'georgia', '格鲁吉亚', '喬治亞', 'GE'],
    coordinates: [41.7151, 44.8271]
  },
  '🇬🇬': {
    en: 'Guernsey',
    zh: '根西岛',
    aliases: ['gg', 'guernsey', '根西', '根息', 'GG'],
    coordinates: [49.4657, -2.5853]
  },
  '🇬🇮': {
    en: 'Gibraltar',
    zh: '直布罗陀',
    aliases: ['gi', 'gibraltar', '直布罗陀', 'GI'],
    coordinates: [36.1377, -5.3453]
  },
  '🇬🇱': {
    en: 'Greenland',
    zh: '格陵兰',
    aliases: ['gl', 'greenland', '格陵兰', '格陵蘭', 'GL'],
    coordinates: [71.7069, -42.6043]
  },
  '🇬🇵': {
    en: 'Guadeloupe',
    zh: '瓜德罗普',
    aliases: ['gp', 'guadeloupe', '瓜德罗普', '瓜地洛普', 'GP'],
    coordinates: [16.2650, -61.5510]
  },
  '🇬🇶': {
    en: 'Equatorial Guinea',
    zh: '赤道几内亚',
    aliases: ['gq', 'equatorial guinea', '赤道几内亚', '赤道幾內亞', 'GQ'],
    coordinates: [3.7504, 8.7371]
  },
  '🇬🇸': {
    en: 'South Georgia and South Sandwich Islands',
    zh: '南乔治亚和南桑威奇群岛',
    aliases: ['gs', 'south georgia', '南乔治亚', '南喬治亞', '南桑威奇', 'GS'],
    coordinates: [-54.2806, -36.5079]
  },
  '🇬🇺': {
    en: 'Guam',
    zh: '关岛',
    aliases: ['gu', 'guam', '关岛', '關島', 'GU'],
    coordinates: [13.4443, 144.7937]
  },
  '🇭🇲': {
    en: 'Heard & McDonald Islands',
    zh: '赫德岛和麦克唐纳群岛',
    aliases: ['hm', 'heard mcdonald', '赫德岛', 'HM'],
    coordinates: [-53.0818, 73.5042]
  },
  '🇮🇨': {
    en: 'Canary Islands',
    zh: '加那利群岛',
    aliases: ['ic', 'canary', '加那利', 'IC'],
    coordinates: [28.2916, -16.6291]
  },
  '🇮🇪': {
    en: 'Ireland',
    zh: '爱尔兰',
    aliases: ['ie', 'ireland', '爱尔兰', '愛爾蘭', 'IE'],
    coordinates: [53.4129, -8.2439]
  },
  '🇮🇱': {
    en: 'Israel',
    zh: '以色列',
    aliases: ['il', 'israel', '以色列', 'IL'],
    coordinates: [31.7683, 35.2137]
  },
  '🇮🇲': {
    en: 'Isle of Man',
    zh: '马恩岛',
    aliases: ['im', 'isle of man', '马恩岛', '曼島', 'IM'],
    coordinates: [54.2361, -4.5481]
  },
  '🇮🇴': {
    en: 'British Indian Ocean Territory',
    zh: '英属印度洋领地',
    aliases: ['io', 'british indian ocean', '英属印度洋', 'IO'],
    coordinates: [-6.3432, 71.8765]
  },
  '🇮🇶': {
    en: 'Iraq',
    zh: '伊拉克',
    aliases: ['iq', 'iraq', '伊拉克', 'IQ'],
    coordinates: [33.3152, 44.3661]
  },
  '🇮🇷': {
    en: 'Iran',
    zh: '伊朗',
    aliases: ['ir', 'iran', '伊朗', 'IR'],
    coordinates: [35.6892, 51.3890]
  },
  '🇮🇸': {
    en: 'Iceland',
    zh: '冰岛',
    aliases: ['is', 'iceland', '冰岛', '冰島', 'IS'],
    coordinates: [64.1466, -21.9426]
  },
  '🇯🇪': {
    en: 'Jersey',
    zh: '泽西岛',
    aliases: ['je', 'jersey', '泽西', '澤西', 'JE'],
    coordinates: [49.2144, -2.1313]
  },
  '🇯🇴': {
    en: 'Jordan',
    zh: '约旦',
    aliases: ['jo', 'jordan', '约旦', '約旦', 'JO'],
    coordinates: [31.9454, 35.9284]
  },
  '🇰🇬': {
    en: 'Kyrgyzstan',
    zh: '吉尔吉斯斯坦',
    aliases: ['kg', 'kyrgyzstan', '吉尔吉斯', '吉爾吉斯', 'KG'],
    coordinates: [42.8746, 74.5698]
  },
  '🇰🇮': {
    en: 'Kiribati',
    zh: '基里巴斯',
    aliases: ['ki', 'kiribati', '基里巴斯', '吉里巴斯', 'KI'],
    coordinates: [1.8739, -157.3630]
  },
  '🇰🇲': {
    en: 'Comoros',
    zh: '科摩罗',
    aliases: ['km', 'comoros', '科摩罗', '葛摩', 'KM'],
    coordinates: [-11.8750, 43.8722]
  },
  '🇰🇳': {
    en: 'Saint Kitts & Nevis',
    zh: '圣基茨和尼维斯',
    aliases: ['kn', 'st kitts nevis', '圣基茨', '聖克里斯多福及尼維斯', 'KN'],
    coordinates: [17.3578, -62.7830]
  },
  '🇰🇵': {
    en: 'North Korea',
    zh: '朝鲜',
    aliases: ['kp', 'north korea', 'dprk', '朝鲜', '北韓', 'KP'],
    coordinates: [39.0392, 125.7625]
  },
  '🇰🇼': {
    en: 'Kuwait',
    zh: '科威特',
    aliases: ['kw', 'kuwait', '科威特', 'KW'],
    coordinates: [29.3759, 47.9774]
  },
  '🇰🇾': {
    en: 'Cayman Islands',
    zh: '开曼群岛',
    aliases: ['ky', 'cayman', '开曼', '開曼', 'KY'],
    coordinates: [19.3133, -81.2546]
  },
  '🇰🇿': {
    en: 'Kazakhstan',
    zh: '哈萨克斯坦',
    aliases: ['kz', 'kazakhstan', '哈萨克', '哈薩克', 'KZ'],
    coordinates: [51.1605, 71.4704]
  },
  '🇱🇧': {
    en: 'Lebanon',
    zh: '黎巴嫩',
    aliases: ['lb', 'lebanon', '黎巴嫩', 'LB'],
    coordinates: [33.8886, 35.4955]
  },
  '🇱🇨': {
    en: 'Saint Lucia',
    zh: '圣卢西亚',
    aliases: ['lc', 'st lucia', '圣卢西亚', '聖露西亞', 'LC'],
    coordinates: [13.9094, -60.9789]
  },
  '🇱🇮': {
    en: 'Liechtenstein',
    zh: '列支敦士登',
    aliases: ['li', 'liechtenstein', '列支敦士登', 'LI'],
    coordinates: [47.1410, 9.5209]
  },
  '🇱🇰': {
    en: 'Sri Lanka',
    zh: '斯里兰卡',
    aliases: ['lk', 'sri lanka', '斯里兰卡', '斯里蘭卡', 'LK'],
    coordinates: [6.9271, 79.8612]
  },
  '🇱🇸': {
    en: 'Lesotho',
    zh: '莱索托',
    aliases: ['ls', 'lesotho', '莱索托', '賴索托', 'LS'],
    coordinates: [-29.6100, 28.2336]
  },
  '🇱🇺': {
    en: 'Luxembourg',
    zh: '卢森堡',
    aliases: ['lu', 'luxembourg', '卢森堡', '盧森堡', 'LU'],
    coordinates: [49.6116, 6.1319]
  },
  '🇲🇨': {
    en: 'Monaco',
    zh: '摩纳哥',
    aliases: ['mc', 'monaco', '摩纳哥', '摩納哥', 'MC'],
    coordinates: [43.7384, 7.4246]
  },
  '🇲🇩': {
    en: 'Moldova',
    zh: '摩尔多瓦',
    aliases: ['md', 'moldova', '摩尔多瓦', '摩爾多瓦', 'MD'],
    coordinates: [47.0105, 28.8638]
  },
  '🇲🇪': {
    en: 'Montenegro',
    zh: '黑山',
    aliases: ['me', 'montenegro', '黑山', '蒙特內哥羅', 'ME'],
    coordinates: [42.4304, 19.2594]
  },
  '🇲🇫': {
    en: 'Saint Martin',
    zh: '法属圣马丁',
    aliases: ['mf', 'st martin', '圣马丁', '聖馬丁', 'MF'],
    coordinates: [18.0708, -63.0501]
  },
  '🇲🇬': {
    en: 'Madagascar',
    zh: '马达加斯加',
    aliases: ['mg', 'madagascar', '马达加斯加', '馬達加斯加', 'MG'],
    coordinates: [-18.7669, 46.8691]
  },
  '🇲🇭': {
    en: 'Marshall Islands',
    zh: '马绍尔群岛',
    aliases: ['mh', 'marshall', '马绍尔', '馬紹爾', 'MH'],
    coordinates: [7.1315, 171.1845]
  },
  '🇲🇰': {
    en: 'North Macedonia',
    zh: '北马其顿',
    aliases: ['mk', 'macedonia', '马其顿', '北馬其頓', 'MK'],
    coordinates: [41.9981, 21.4254]
  },
  '🇲🇳': {
    en: 'Mongolia',
    zh: '蒙古',
    aliases: ['mn', 'mongolia', '蒙古', 'MN'],
    coordinates: [47.9213, 106.9055]
  },
  '🇲🇵': {
    en: 'Northern Mariana Islands',
    zh: '北马里亚纳群岛',
    aliases: ['mp', 'northern mariana', '北马里亚纳', '北馬利安納', 'MP'],
    coordinates: [15.0979, 145.6739]
  },
  '🇲🇶': {
    en: 'Martinique',
    zh: '马提尼克',
    aliases: ['mq', 'martinique', '马提尼克', '馬丁尼克', 'MQ'],
    coordinates: [14.6415, -61.0242]
  },
  '🇲🇷': {
    en: 'Mauritania',
    zh: '毛里塔尼亚',
    aliases: ['mr', 'mauritania', '毛里塔尼亚', '茅利塔尼亞', 'MR'],
    coordinates: [18.0735, -15.9582]
  },
  '🇲🇸': {
    en: 'Montserrat',
    zh: '蒙特塞拉特',
    aliases: ['ms', 'montserrat', '蒙特塞拉特', '蒙哲臘', 'MS'],
    coordinates: [16.7425, -62.1874]
  },
  '🇲🇹': {
    en: 'Malta',
    zh: '马耳他',
    aliases: ['mt', 'malta', '马耳他', '馬爾他', 'MT'],
    coordinates: [35.8997, 14.5146]
  },
  '🇲🇺': {
    en: 'Mauritius',
    zh: '毛里求斯',
    aliases: ['mu', 'mauritius', '毛里求斯', '模里西斯', 'MU'],
    coordinates: [-20.3484, 57.5522]
  },
  '🇲🇻': {
    en: 'Maldives',
    zh: '马尔代夫',
    aliases: ['mv', 'maldives', '马尔代夫', '馬爾地夫', 'MV'],
    coordinates: [4.1755, 73.5093]
  },
  '🇲🇼': {
    en: 'Malawi',
    zh: '马拉维',
    aliases: ['mw', 'malawi', '马拉维', '馬拉威', 'MW'],
    coordinates: [-13.9626, 33.7741]
  },
  '🇲🇿': {
    en: 'Mozambique',
    zh: '莫桑比克',
    aliases: ['mz', 'mozambique', '莫桑比克', '莫三比克', 'MZ'],
    coordinates: [-25.9653, 32.5832]
  },
  '🇳🇨': {
    en: 'New Caledonia',
    zh: '新喀里多尼亚',
    aliases: ['nc', 'new caledonia', '新喀里多尼亚', '新喀里多尼亞', 'NC'],
    coordinates: [-21.1151, 165.8560]
  },
  '🇳🇫': {
    en: 'Norfolk Island',
    zh: '诺福克岛',
    aliases: ['nf', 'norfolk', '诺福克', '諾福克', 'NF'],
    coordinates: [-29.0408, 167.9547]
  },
  '🇳🇵': {
    en: 'Nepal',
    zh: '尼泊尔',
    aliases: ['np', 'nepal', '尼泊尔', '尼泊爾', 'NP'],
    coordinates: [27.7172, 85.3240]
  },
  '🇳🇷': {
    en: 'Nauru',
    zh: '瑙鲁',
    aliases: ['nr', 'nauru', '瑙鲁', '諾魯', 'NR'],
    coordinates: [-0.5477, 166.9209]
  },
  '🇳🇺': {
    en: 'Niue',
    zh: '纽埃',
    aliases: ['nu', 'niue', '纽埃', '紐埃', 'NU'],
    coordinates: [-19.0544, -169.8672]
  },
  '🇳🇿': {
    en: 'New Zealand',
    zh: '新西兰',
    aliases: ['nz', 'new zealand', '新西兰', '紐西蘭', 'NZ'],
    coordinates: [-40.9006, 174.8860]
  },
  '🇴🇲': {
    en: 'Oman',
    zh: '阿曼',
    aliases: ['om', 'oman', '阿曼', 'OM'],
    coordinates: [21.5126, 55.9233]
  },
  '🇵🇫': {
    en: 'French Polynesia',
    zh: '法属波利尼西亚',
    aliases: ['pf', 'french polynesia', '法属波利尼西亚', '法屬玻里尼西亞', 'PF'],
    coordinates: [-17.6797, -149.4068]
  },
  '🇵🇬': {
    en: 'Papua New Guinea',
    zh: '巴布亚新几内亚',
    aliases: ['pg', 'papua new guinea', '巴布亚新几内亚', '巴布亞紐幾內亞', 'PG'],
    coordinates: [-9.4438, 147.1803]
  },
  '🇵🇰': {
    en: 'Pakistan',
    zh: '巴基斯坦',
    aliases: ['pk', 'pakistan', '巴基斯坦', 'PK'],
    coordinates: [33.6844, 73.0479]
  },
  '🇵🇲': {
    en: 'Saint Pierre & Miquelon',
    zh: '圣皮埃尔和密克隆',
    aliases: ['pm', 'st pierre miquelon', '圣皮埃尔', '聖皮埃爾和密克隆', 'PM'],
    coordinates: [46.8852, -56.3159]
  },
  '🇵🇳': {
    en: 'Pitcairn Islands',
    zh: '皮特凯恩群岛',
    aliases: ['pn', 'pitcairn', '皮特凯恩', '皮特肯群島', 'PN'],
    coordinates: [-25.0657, -130.1005]
  },
  '🇵🇷': {
    en: 'Puerto Rico',
    zh: '波多黎各',
    aliases: ['pr', 'puerto rico', '波多黎各', 'PR'],
    coordinates: [18.4655, -66.1057]
  },
  '🇵🇸': {
    en: 'Palestine',
    zh: '巴勒斯坦',
    aliases: ['ps', 'palestine', '巴勒斯坦', 'PS'],
    coordinates: [31.9474, 35.2272]
  },
  '🇵🇼': {
    en: 'Palau',
    zh: '帕劳',
    aliases: ['pw', 'palau', '帕劳', '帛琉', 'PW'],
    coordinates: [7.5150, 134.5825]
  },
  '🇶🇦': {
    en: 'Qatar',
    zh: '卡塔尔',
    aliases: ['qa', 'qatar', '卡塔尔', '卡達', 'QA'],
    coordinates: [25.2867, 51.5310]
  },
  '🇷🇪': {
    en: 'Réunion',
    zh: '留尼汪',
    aliases: ['re', 'reunion', '留尼汪', '留尼旺', 'RE'],
    coordinates: [-21.1151, 55.5364]
  },
  '🇷🇸': {
    en: 'Serbia',
    zh: '塞尔维亚',
    aliases: ['rs', 'serbia', '塞尔维亚', '塞爾維亞', 'RS'],
    coordinates: [44.8125, 20.4612]
  },
  '🇸🇦': {
    en: 'Saudi Arabia',
    zh: '沙特阿拉伯',
    aliases: ['sa', 'saudi', '沙特', '沙烏地阿拉伯', 'SA'],
    coordinates: [24.7136, 46.6753]
  },
  '🇸🇧': {
    en: 'Solomon Islands',
    zh: '所罗门群岛',
    aliases: ['sb', 'solomon', '所罗门', '索羅門群島', 'SB'],
    coordinates: [-9.6457, 160.1562]
  },
  '🇸🇨': {
    en: 'Seychelles',
    zh: '塞舌尔',
    aliases: ['sc', 'seychelles', '塞舌尔', '塞席爾', 'SC'],
    coordinates: [-4.6796, 55.4920]
  },
  '🇸🇭': {
    en: 'Saint Helena',
    zh: '圣赫勒拿',
    aliases: ['sh', 'st helena', '圣赫勒拿', '聖海倫娜', 'SH'],
    coordinates: [-15.9387, -5.7089]
  },
  '🇸🇯': {
    en: 'Svalbard & Jan Mayen',
    zh: '斯瓦尔巴和扬马延',
    aliases: ['sj', 'svalbard', '斯瓦尔巴', '斯瓦爾巴', 'SJ'],
    coordinates: [78.2232, 15.6468]
  },
  '🇸🇲': {
    en: 'San Marino',
    zh: '圣马力诺',
    aliases: ['sm', 'san marino', '圣马力诺', '聖馬利諾', 'SM'],
    coordinates: [43.9333, 12.4463]
  },
  '🇸🇴': {
    en: 'Somalia',
    zh: '索马里',
    aliases: ['so', 'somalia', '索马里', '索馬利亞', 'SO'],
    coordinates: [2.0469, 45.3182]
  },
  '🇸🇹': {
    en: 'São Tomé & Príncipe',
    zh: '圣多美和普林西比',
    aliases: ['st', 'sao tome', '圣多美', '聖多美普林西比', 'ST'],
    coordinates: [0.3365, 6.7313]
  },
  '🇸🇽': {
    en: 'Sint Maarten',
    zh: '荷属圣马丁',
    aliases: ['sx', 'sint maarten', '荷属圣马丁', '荷屬聖馬丁', 'SX'],
    coordinates: [18.0425, -63.0548]
  },
  '🇸🇾': {
    en: 'Syria',
    zh: '叙利亚',
    aliases: ['sy', 'syria', '叙利亚', '敘利亞', 'SY'],
    coordinates: [33.5138, 36.2765]
  },
  '🇸🇿': {
    en: 'Eswatini',
    zh: '斯威士兰',
    aliases: ['sz', 'swaziland', 'eswatini', '斯威士兰', '史瓦帝尼', 'SZ'],
    coordinates: [-26.3054, 31.1367]
  },
  '🇹🇦': {
    en: 'Tristan da Cunha',
    zh: '特里斯坦-达库尼亚',
    aliases: ['ta', 'tristan da cunha', '特里斯坦', 'TA'],
    coordinates: [-37.1052, -12.2777]
  },
  '🇹🇨': {
    en: 'Turks & Caicos Islands',
    zh: '特克斯和凯科斯群岛',
    aliases: ['tc', 'turks caicos', '特克斯', '土克凱可群島', 'TC'],
    coordinates: [21.6940, -71.7979]
  },
  '🇹🇫': {
    en: 'French Southern Territories',
    zh: '法属南部领地',
    aliases: ['tf', 'french southern', '法属南部', '法屬南部領土', 'TF'],
    coordinates: [-49.2804, 69.3486]
  },
  '🇹🇯': {
    en: 'Tajikistan',
    zh: '塔吉克斯坦',
    aliases: ['tj', 'tajikistan', '塔吉克', '塔吉克', 'TJ'],
    coordinates: [38.5598, 68.7870]
  },
  '🇹🇰': {
    en: 'Tokelau',
    zh: '托克劳',
    aliases: ['tk', 'tokelau', '托克劳', 'TK'],
    coordinates: [-9.2005, -171.8484]
  },
  '🇹🇱': {
    en: 'Timor-Leste',
    zh: '东帝汶',
    aliases: ['tl', 'timor leste', 'east timor', '东帝汶', '東帝汶', 'TL'],
    coordinates: [-8.5569, 125.5603]
  },
  '🇹🇲': {
    en: 'Turkmenistan',
    zh: '土库曼斯坦',
    aliases: ['tm', 'turkmenistan', '土库曼', '土庫曼', 'TM'],
    coordinates: [37.9601, 58.3261]
  },
  '🇹🇴': {
    en: 'Tonga',
    zh: '汤加',
    aliases: ['to', 'tonga', '汤加', '東加', 'TO'],
    coordinates: [-21.1790, -175.1982]
  },
  '🇹🇻': {
    en: 'Tuvalu',
    zh: '图瓦卢',
    aliases: ['tv', 'tuvalu', '图瓦卢', '吐瓦魯', 'TV'],
    coordinates: [-8.5243, 179.1942]
  },
  '🇺🇦': {
    en: 'Ukraine',
    zh: '乌克兰',
    aliases: ['ua', 'ukraine', '乌克兰', '烏克蘭', 'UA'],
    coordinates: [50.4501, 30.5234]
  },
  '🇺🇲': {
    en: 'U.S. Minor Outlying Islands',
    zh: '美国本土外小岛屿',
    aliases: ['um', 'us minor islands', '美国小岛', 'UM'],
    coordinates: [19.2823, 166.6470]
  },
  '🇺🇳': {
    en: 'United Nations',
    zh: '联合国',
    aliases: ['un', 'united nations', '联合国', '聯合國', 'UN'],
    coordinates: [40.7489, -73.9680]
  },
  '🇺🇿': {
    en: 'Uzbekistan',
    zh: '乌兹别克斯坦',
    aliases: ['uz', 'uzbekistan', '乌兹别克', '烏茲別克', 'UZ'],
    coordinates: [41.2995, 69.2401]
  },
  '🇻🇦': {
    en: 'Vatican City',
    zh: '梵蒂冈',
    aliases: ['va', 'vatican', '梵蒂冈', '梵諦岡', 'VA'],
    coordinates: [41.9029, 12.4534]
  },
  '🇻🇨': {
    en: 'Saint Vincent & Grenadines',
    zh: '圣文森特和格林纳丁斯',
    aliases: ['vc', 'st vincent', '圣文森特', '聖文森及格瑞那丁', 'VC'],
    coordinates: [13.2528, -61.1971]
  },
  '🇻🇬': {
    en: 'British Virgin Islands',
    zh: '英属维尔京群岛',
    aliases: ['vg', 'british virgin', '英属维尔京', '英屬維京群島', 'VG'],
    coordinates: [18.4207, -64.6400]
  },
  '🇻🇮': {
    en: 'U.S. Virgin Islands',
    zh: '美属维尔京群岛',
    aliases: ['vi', 'us virgin', '美属维尔京', '美屬維京群島', 'VI'],
    coordinates: [18.3358, -64.8963]
  },
  '🇻🇺': {
    en: 'Vanuatu',
    zh: '瓦努阿图',
    aliases: ['vu', 'vanuatu', '瓦努阿图', '萬那杜', 'VU'],
    coordinates: [-17.7333, 168.3273]
  },
  '🇼🇫': {
    en: 'Wallis & Futuna',
    zh: '瓦利斯和富图纳',
    aliases: ['wf', 'wallis futuna', '瓦利斯', '瓦利斯和富圖納', 'WF'],
    coordinates: [-13.2825, -176.1764]
  },
  '🇼🇸': {
    en: 'Samoa',
    zh: '萨摩亚',
    aliases: ['ws', 'samoa', '萨摩亚', '薩摩亞', 'WS'],
    coordinates: [-13.8484, -171.7518]
  },
  '🇽🇰': {
    en: 'Kosovo',
    zh: '科索沃',
    aliases: ['xk', 'kosovo', '科索沃', 'XK'],
    coordinates: [42.6026, 20.9030]
  },
  '🇾🇪': {
    en: 'Yemen',
    zh: '也门',
    aliases: ['ye', 'yemen', '也门', '葉門', 'YE'],
    coordinates: [15.3694, 44.1910]
  },
  '🇾🇹': {
    en: 'Mayotte',
    zh: '马约特',
    aliases: ['yt', 'mayotte', '马约特', '馬約特', 'YT'],
    coordinates: [-12.8275, 45.1662]
  }
};

/**
 * 检查地区emoji是否匹配搜索词
 * @param regionEmoji 地区emoji（如：🇭🇰）
 * @param searchTerm 搜索词
 * @returns 是否匹配
 */
export const isRegionMatch = (regionEmoji: string, searchTerm: string): boolean => {
  const lowerSearchTerm = searchTerm.toLowerCase().trim();
  
  // 直接匹配emoji
  if (regionEmoji === searchTerm) {
    return true;
  }
  
  // 从映射表中查找
  const regionInfo = emojiToRegionMap[regionEmoji];
  if (!regionInfo) {
    // 如果映射表中没有，则只进行简单的包含匹配
    return regionEmoji.toLowerCase().includes(lowerSearchTerm);
  }
  
  // 检查英文名称
  if (regionInfo.en.toLowerCase().includes(lowerSearchTerm)) {
    return true;
  }
  
  // 检查中文名称
  if (regionInfo.zh.includes(lowerSearchTerm)) {
    return true;
  }
  
  // 检查别名
  return regionInfo.aliases.some(alias => 
    alias.toLowerCase().includes(lowerSearchTerm)
  );
};

/**
 * 获取地区的显示名称
 * @param regionEmoji 地区emoji
 * @param language 语言 ('en' | 'zh')
 * @returns 地区名称
 */
export const getRegionDisplayName = (regionEmoji: string, language: 'en' | 'zh' = 'zh'): string => {
  const regionInfo = emojiToRegionMap[regionEmoji];
  if (!regionInfo) {
    return regionEmoji;
  }
  
  return language === 'zh' ? regionInfo.zh : regionInfo.en;
};

/**
 * 获取所有支持的地区emoji列表
 * @returns 地区emoji数组
 */
export const getSupportedRegions = (): string[] => {
  return Object.keys(emojiToRegionMap);
};

/**
 * 获取地区的地理坐标
 * @param regionEmoji 地区emoji
 * @returns [纬度, 经度] 或 undefined
 */
export const getRegionCoordinates = (regionEmoji: string): [number, number] | undefined => {
  const regionInfo = emojiToRegionMap[regionEmoji];
  return regionInfo?.coordinates;
};
