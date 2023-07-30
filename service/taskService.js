const ApiError = require("../error/ApiError")
const { Task } = require('../models/models')
const uuid = require('uuid')

class TaskService {
   async addingTask (taskList, taskName, taskDescription) {
      const unicId = uuid.v1()
      const task = await Task.create({taskList, taskName, taskDescription, unicId})
      return task
   }

   async updateTask (taskList, taskName, taskDescription, unicId) {
      try {
         const task = await Task.findOne({where: {unicId: unicId}})
         if (!task) {
            throw ApiError.badRequest('Такая задача не найдена')
         }
         //Обновление значений
         task.taskName = taskName;
         task.taskDescription = taskDescription;

         //Сохранение обновленного значения в БД
         await task.save()
         return task;
      } catch (error) {
         throw error
      }
   }

   async deleteTask (unicId) {
      try {
         //Поиск задачи
         const task = await Task.findOne({where: {unicId: unicId}})
         if (!task) {
            throw ApiError.badRequest('Такая задача не найдена')
         }
         //Удаление задачи 
         await task.destroy()
         return { message: 'Задача успешно удалена'}
      } catch (error) {
         throw error
      }
   }
}

module.exports = new TaskService();