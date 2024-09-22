const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// @route GET /api/employees
// @desc Получение всех сотрудников
// @access Private
const all = async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Не удалось получить сотрудников' });
  }
};

// @route POST /api/employees/add
// @desc Добавление сотрудника
// @access Private

const add = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);

    if (!data.firstName || !data.lastName || !data.address || !data.age) {
      return res.status(400).json({
        message: 'Пожалуйста заполните все поля',
      });
    }

    const employee = await prisma.employee.create({
      data: {
        ...data,
        userId: req.user.id,
      },
    });
    return res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Что то пошло не так' });
  }
};

// @route POST /api/employees/remove/:id
// @desc Удаление сотрудника
// @access Private

const remove = async (req, res) => {
  try {
    const { id } = req.body;
    await prisma.employee.delete({
      where: {
        id,
      },
    });
    res.status(204).json('OK');
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось удалить сотрудника',
    });
  }
};

// @route PUT /api/employees/edit/:id
// @desc Редактирование сотрудника
// @access Private

const edit = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    await prisma.employee.update({
      where: {
        id,
      },
      data,
    });

    res.status(204).json('OK');
  } catch (error) {
    return res.status(500).json({
      message: 'Не удалось редактировать сотрудника',
    });
  }
};

// @route GET /api/employees/:id
// @desc Получение сотрудника
// @access Private

const employee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await prisma.employee.findUnique({
      where: { id },
    });
    console.log(employee);

    res.status(200).json(employee);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: 'Не удалось получить сотрудника',
    });
  }
};

module.exports = {
  all,
  add,
  edit,
  employee,
  remove,
};
