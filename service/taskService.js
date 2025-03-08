const express = require("express");
const router = express.Router();
const TaskModel = require("../model/task");
const mongoose = require("mongoose");
const { constants } = require("../constants");

const nameMinLength = process.env.MIN_TASK_NAME_LENGTH;
const nameMaxLength = process.env.MAX_TASK_NAME_LENGTH;
const descriptionMinLength = process.env.MIN_TASK_DESCRIPTION_LENGTH;
const descriptionMaxLength = process.env.MAX_TASK_DESCRIPTION_LENGTH;

router.post("/", async (req, res) => {
  try {
    const { name, description, createdBy } = req.body;
    if (!createdBy) {
      res.status(400).send({
        message: constants.createdByIsEmpty,
      });
      return;
    }
    if (name?.length < nameMinLength) {
      res.status(400).send({
        message: constants.taskNameMinCharError,
      });
      return;
    }
    if (name?.length > nameMaxLength) {
      res.status(400).send({
        message: constants.taskNameMaxCharError,
      });
      return;
    }
    if (description?.length < descriptionMinLength) {
      res.status(400).send({
        message: constants.taskDescriptionMinCharErr,
      });
      return;
    }
    if (description?.length > descriptionMaxLength) {
      res.status(400).send({
        message: constants.taskDescriptionMaxCharErr,
      });
      return;
    }
    const response = await TaskModel.create(req.body);
    const data = response.toJSON();
    res.status(201).send({
      data,
      message: constants.taskCreated,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) {
      res.status(400).send({
        message: "UserId is null",
      });
      return;
    }
    const tasks = await TaskModel.find({ createdBy: userId });
    res.status(200).send({
      data: tasks,
      message: constants.taskFetched,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({
        message: constants.idIsEmpty,
      });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }

    const objId = new mongoose.Types.ObjectId(id);

    const task = await TaskModel.findById({ _id: objId });
    res.status(200).send({
      task,
      message: constants.taskFetched,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const reqBody = req.body;
    if (!id) {
      res.status(400).send({
        message: constants.idIsEmpty,
      });
      return;
    }
    const reqId = new mongoose.Types.ObjectId(id);
    const updatedData = await TaskModel.findByIdAndUpdate(reqId, reqBody, {
      new: true,
    });
    res.status(200).send({
      data: updatedData,
      message: constants.taskUpdated,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).send({
        message: constants.idIsEmpty,
      });
      return;
    }
    const objId = new mongoose.Types.ObjectId(id);

    const deletedObj = await TaskModel.findByIdAndDelete(objId);
    res.status(200).send({
      message: constants.taskDeleted,
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
});

module.exports = router;
