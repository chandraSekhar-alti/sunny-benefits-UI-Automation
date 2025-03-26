const { Given, When, Then } = require("@wdio/cucumber-framework");


const allTasksActions= require(`../../pageobjects/ui/allActionsPage`)




Then(/^User is selecting a task from All Actions For You$/, async () => {
    await allTasksActions.taskActions();
    await allTasksActions.selectPendingAction();

});
