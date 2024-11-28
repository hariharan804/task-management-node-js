//update task status task end data and time using cron job
import Tasks from "models/tasks";
import cron from "node-cron";

export const TaskUpdateCronJob  = (completedDate: any) => {   
    cron.schedule("* * * * *", async () => {
        try {
            await Tasks.query().update({ is_active: false });            
        } catch (error) {
            console.log("error", error);
        }
    });
};

export const checkAndUpdateTasks =   () => {

// Define a cron job to update statuses
cron.schedule('*/1 * * * *', async () => {
    console.log('Cron job running:', new Date().toLocaleString());
  
    try {
        const now = new Date();
      // Fetch records with status 
      const pendingTasks = await Tasks.query()
      .where('status', 'In Progress')
      .andWhere('end_at', '<=', now);
  
      if (pendingTasks.length > 0) {
        // Update the status of all pending tasks to 'completed'
        const updated = await Tasks.query()
        .where('status', 'In Progress')
        .andWhere('end_at', '<=', now)
          .patch({ status: 'completed', updated_at: new Date()?.toISOString() });
        console.log(`Updated ${updated} tasks to 'completed'.`);
      } else {
        console.log('No pending tasks to update.');
      }
    } catch (error) {
      console.error('Error updating tasks:', error);
    }
  });
}