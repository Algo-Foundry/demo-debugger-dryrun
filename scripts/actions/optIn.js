const { executeTransaction, convert, readAppGlobalState, readAppLocalState } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");
    const acc1 = deployer.accountsByName.get("acc1");
    const approvalFile = "game_approval.py";
    const clearStateFile = "game_clearstate.py";

    // get app info
    const gameApp = deployer.getApp(approvalFile, clearStateFile);
    const appID = gameApp.appID;
    let globalState = await readAppGlobalState(deployer, master.addr, appID);
    console.log(globalState);

    // opt in
    await executeTransaction(deployer, {
        type: types.TransactionType.OptInToApp,
        sign: types.SignType.SecretKey,
        fromAccount: acc1,
        appID: appID,
        payFlags: { totalFee: 1000 }
    });

    // get player state
    let playerState = await readAppLocalState(deployer, acc1.addr, appID);
    console.log(playerState);
}

module.exports = { default: run };
