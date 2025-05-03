export const getCorsConfig = () => {
  const isProduction = process.env.NODE_ENV === 'production';
  // TODO: I assumed we'll have a comma separated list of origins for the production environment of the frontend
  if (isProduction) {
    const corsOrigin = process.env.CORS_ORIGIN?.split(',').map((origin) => origin.trim()) || [];
    return {
      origin: corsOrigin,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
      credentials: true,
    };
  }

  return {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  };
};
