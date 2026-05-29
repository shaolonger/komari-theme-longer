import { Flex, Text } from '@radix-ui/themes';

const Footer = () => {
  return (
    <footer className='footer py-3 px-4 border-t-1 border-t-[var(--gray-7)] bg-accent-1'>
      <Flex justify="center" align="center" className="w-full">
        <Text size="2" color="gray" className="text-center">
          Powered by{' '}
          <a href='https://github.com/komari-monitor/komari' className='font-bold' target='_blank'>
            Komari Monitor
          </a>
          {' | '}
          Theme by{' '}
          <a href='https://github.com/svnmoe/komari-web-mochi' className='font-bold' target='_blank'>
            Mochi
          </a>
        </Text>
      </Flex>
    </footer>
  );
};

export default Footer;

