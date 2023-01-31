const { convert } = require("@algo-builder/algob");
const algosdk = require("algosdk");
const fs = require("fs");

async function run(runtimeEnv, deployer) {
    const master = deployer.accountsByName.get("master");

    // get app info
    const app = deployer.getApp("Counter App");
    const appID = app.appID;

    // call app to "Add"
    const appArgs = ["Add"].map(convert.stringToBytes);

    /**
     * Debug using TEAL debugger
     * 1. ./sandbox copyTo ../af-demos/demo-debugger-dryrun/dryrun.msgp
     * 2. ./sandbox tealdbg debug -d dryrun.msgp --remote-debugging-port 9392
     * 3. Chrome URL: chrome://inspect/#devices
     */
    const suggestedParams = await deployer.algodClient.getTransactionParams().do();
    const tx = algosdk.makeApplicationNoOpTxn(
        master.addr,
        suggestedParams,
        appID,
        appArgs
    );

    const signedCallTxn = tx.signTxn(master.sk);

    const drr = await algosdk.createDryrun({
        client: deployer.algodClient,
        txns: [algosdk.decodeSignedTransaction(signedCallTxn)],
    });

    // Create dump file
    const filename = "dryrun.msgp";
    fs.writeFileSync(filename, algosdk.encodeObj(drr.get_obj_for_encoding(true)));
}

module.exports = { default: run };
