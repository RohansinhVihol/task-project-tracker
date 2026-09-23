import { app } from "../src/app";
import "dotenv/config";
import request from "supertest";
import { describe, it, expect, beforeAll, afterAll, jest } from "@jest/globals";
import mongoose from "mongoose";
import { connectDB } from "../src/db/index";
import { Task } from "../src/models/Task.model";
import { updateTaskParamsSchema } from "../src/zod-validator/task.validator";

beforeAll(async () => {
  await connectDB();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("GET /", () => {
  it("should return API Working", async () => {
    const res = await request(app).get("/");

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      message: "API Working",
    });
  });
});

describe("POST /tasks", () => {

  it("should create a task successfully", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
        description: "This is a test task",
        assignee: "Rahul Sharma",
        dueDate: "2026-10-01",
        status: "todo",
      });

    expect(res.status).toBe(200);

    expect(res.body).toHaveProperty("data");
    expect(res.body.message).toBe("Task Created Succssfully");
  });

  // failure path
  it("should return 400 when required fields are missing", async () => {
    const res = await request(app)
      .post("/api/tasks")
      .send({
        title: "Test Task",
      });

    expect(res.status).toBe(400);
  });

});

describe("GET /tasks", () => {

  it("should return all the tasks successfully", async() => {
    
    const res = await request(app).get('/api/tasks')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    expect(res.body).toHaveProperty("data")
    expect(res.body.message).toBe("Task Fectched Successfully")

  })

  //  failure path
  it("should return 400 when there is no task in db",async() =>{

  //   jest.spyOn(Task, "find").mockReturnValue({
  //   sort: jest.fn().mockResolvedValue([] as any)
  // } as any);
   jest.spyOn(Task, "find").mockReturnValue({
    sort: jest.fn(() => Promise.resolve([]))
   } as any);

    const res = await request(app).get('/api/tasks')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("There is a no Task")

    jest.restoreAllMocks();

  })


})

describe("GET /tasks/:taskId", () => {
  
  it("should return a task by taskId", async() => {

    const res = await request(app).get('/api/tasks/6ab258c780bbb2734ea44bb9')
    expect(res.status).toBe(200)
    expect(res.body.success).toBe(true)
    console.log(res.body.data)
    expect(res.body).toHaveProperty("data")

    // expect(res.body.data).toHaveProperty("title")
    // expect(res.body.data).toHaveProperty("description")
    // expect(res.body.data).toHaveProperty("assignee")
    // expect(res.body.data).toHaveProperty("status")
    // expect(res.body.data).toHaveProperty("dueDate")

    expect(res.body.message).toBe("Task Fetched Successfully")
  })

  //  failure path
  it("should return 400 when required fields are missing when mongo is is invalid", async() =>{

    const res = await request(app).get('/api/tasks/9dh448n4gj')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("Invalid MongoDB ID")

  })

  it("should return 404 when task not found",async() => {
    
    const res = await request(app).get('/api/tasks/6ab3792e2dd11fdefa5396bd')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe("TASK NOT FOUND")

  })

})

describe("PATCH /tasks/:taskId", () => {

  it("should update a task by taskId", async() => {

    const res = await request(app).patch('/api/tasks/6ab37198bc285ed449d1dd01').send({
      title:"updated title"
    })

    expect(res.body.success).toBe(true)
    expect(res.body).toHaveProperty("data")
    expect(res.body.message).toBe("Task updated successfully")

  })

  //  failure path
  it("should return 400 for Invalid Task Id", async() => {
    const invalidId = "a44r49ut430f";

    const expectedMessage = updateTaskParamsSchema.safeParse({ taskId: invalidId }).error?.issues[0]?.message;

    const res = await request(app).patch(`/api/tasks/${invalidId}`).send({ title: "Updated Title" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe(expectedMessage);
  });

  })


describe("DELETE /tasks/:taskId", () => {

  it("should delete a task by taskId", async() => {

      const res = await request(app).delete('/api/tasks/6ab2599280bbb2734ea44bba')

      expect(res.body.success).toBe(true)
      expect(res.body).toHaveProperty("data")
      expect(res.body.message).toBe("Task deleted Successfully")
  })

  //  failure path
  it("should return 400 when id is invalid", async() => {

    const res = await request(app).delete('/api/tasks/d348fn49efn49')
    expect(res.status).toBe(400)
    expect(res.body.message).toBe("INVALID MONGODB ID")
  })

})

