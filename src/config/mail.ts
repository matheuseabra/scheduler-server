interface IMailDriver {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'matheusvieiracoelho@gmail.com',
    },
  },
} as IMailDriver;
