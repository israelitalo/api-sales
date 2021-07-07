interface ImailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'ceo@israeldeveloper.online',
      name: 'IsraelDev',
    },
  },
} as ImailConfig;
