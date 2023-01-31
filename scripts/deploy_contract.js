const { readAppGlobalState } = require("@algo-builder/algob");
const { types } = require("@algo-builder/web");

async function run(runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");
    const approvalFile = "sc_approval.py";
    const clearStateFile = "sc_clearstate.py";

    await deployer.deployApp(
        master,
        {
            appName: "Counter App",
            metaType: types.MetaType.FILE,
            approvalProgramFilename: approvalFile,
            clearProgramFilename: clearStateFile,
            localInts: 0,
            localBytes: 0,
            globalInts: 1,
            globalBytes: 0,
            appArgs: [],
        },
        { totalFee: 1000 }
    );

    // get app info
    const app = deployer.getApp("Counter App");

    let globalState = await readAppGlobalState(deployer, master.addr, app.appID);
    console.log(globalState);
}

module.exports = { default: run };
