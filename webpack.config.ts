const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({
  remotes: {
    libapp: "libapp@https://oneportal-ehckg7axe3dacxhw.a01.azurefd.net/libapp/remoteEntry.js?v=1274",
    tcai: "tcai@https://oneportal-ehckg7axe3dacxhw.a01.azurefd.net/tcai/remoteEntry.js?v=1275",
  },
  shared: {       
   react: { singleton: true, eager: true },
  'react-dom': { singleton: true, eager: true }
   }
});
