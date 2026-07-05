// // services/task.service.ts
// import { prisma } from "../config/db.config.js";
// import type { Task } from "../generated/prisma/client.js";
// import { NotFoundError } from "../shared/errors/index.js";

// export class TaskService {

//   static async create(data: Task) {

//    await prisma.task.create({
//       data,
//     });

//   }

//   static async update(data: any) {
//       const task = await prisma.task.findUnique({
//     where: {
//       id: data.id,
//     },
//   });

//   if (!task) {
//     throw new NotFoundError("Task ");
//   }

//    await prisma.task.update({
//       where: {
//         id: data.id,
//       },
//       data:data,
//       //  {
//       //   title: data.title,
//       //   description: data.description,
//       //   status: data.status,
//       //   priority: data.priority,
//       //   dueDate: data.dueDate,
//       // },
//     });

//   }

 

// }