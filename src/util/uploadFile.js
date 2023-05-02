import axios from 'axios'

async function uploadFile(path, userForm) {
    // 生成formdata对象
    const params = new FormData()
    for (const i in userForm) {
        params.append(i, userForm[i])
    }
    // 发起请求
    const res = await axios.post(path, params, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
    return res
}
export default uploadFile
