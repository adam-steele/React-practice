import { addNewTask, updateTask } from "./server";

(async function serverTest(){
await addNewTask({
    name: "My Task",
    id: "12346"
});

await updateTask({
    id:"12346",
    name: "NAME IS UPDATED"
})
})();

