const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getTasks = async (req, res) => {
  const tasks = await prisma.task.findMany({
    where: { userId: req.user.id },
    include: { subtasks: true },
  });
  res.status(200).json(tasks);
};

exports.createTask = async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const newTask = await prisma.task.create({
    data: {
      title,
      description,
      priority,
      deadline: new Date(deadline),
      userId: req.user.id,
    },
  });
  res.status(201).json(newTask);
};

    exports.updateTask = async (req, res) => {
  const { title, description, status, priority, deadline } = req.body;
  const updatedTask = await prisma.task.update({
    where: { id: parseInt(req.params.taskId) },
    data: {
      title,
      description,
      status,
      priority,
      deadline: new Date(deadline),
    },
  });
  res.status(200).json(updatedTask);
};

exports.deleteTask = async (req, res) => {
  await prisma.task.delete({ where: { id: parseInt(req.params.taskId) } });
  res.status(204).send();
};
