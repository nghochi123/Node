require('../src/db/mongoose');
// const User = require('../src/models/user');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('602ecb715d853325f0a27177').then(task=>{
//     console.log(task)
//     return Task.countDocuments({completed: false})
// }).then(res=>{
//     console.log(res);
// }).catch(e=>console.log(e));

// const updateAgeAndCount = async (id, age) => {
//     const user = await User.findByIdAndUpdate(id, {age});
//     const count = await User.countDocuments({age});
//     return count;
// }

// updateAgeAndCount('602d72688eec8a36bce80688', 4).then(res=>console.log(res)).catch(e=>console.log(e));

const deleteTaskAndCount = async(id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({completed: false});
    return count;
}

deleteTaskAndCount('602d73a08943343de0e4eec7').then(res=>console.log(res)).catch(e=>console.log(e));