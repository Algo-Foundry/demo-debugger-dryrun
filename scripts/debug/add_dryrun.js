const { convert, Tealdbg } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");

    // get app info
    const app = deployer.getApp("Counter App");
    const appID = app.appID;

    // call app to "Add"
    const appArgs = ["Add"].map(convert.stringToBytes);

    const txParams = {
        type: types.TransactionType.CallApp,
        sign: types.SignType.SecretKey,
        fromAccount: master,
        appID: appID,
        payFlags: { totalFee: 1000 },
        appArgs: appArgs,
    }

    const debug = new Tealdbg(deployer, txParams);
    await debug.dryRunResponse('add_dryrun.json', true);
}

module.exports = { default: run };
