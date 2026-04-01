module.exports = (req, res) => {
  res.status(200).json({ 
    status: 'online', 
    timestamp: new Date().toISOString(),
    env_keys: Object.keys(process.env).filter(k => !k.includes('SECRET') && !k.includes('PASS'))
  });
};
