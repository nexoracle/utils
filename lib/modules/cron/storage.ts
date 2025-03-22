import { getRandom } from "../../functions/tools";

declare global {
  var scheduledTasks: Map<string, any>;
}

export const storage = (() => {
  if (!global.scheduledTasks) {
    global.scheduledTasks = new Map();
  }

  return {
    save: (task: any) => {
      if (!task.options) {
        
        task.options = {};
        task.options.name = getRandom({Alphabets: true, Numbers: true, DateNow: true, length: 40});
      }
      global.scheduledTasks.set(task.options.name, task);
    },
    getTasks: () => {
      return global.scheduledTasks;
    },
  };
})();

