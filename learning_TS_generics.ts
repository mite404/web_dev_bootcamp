type ApiResponse<Data> = {
    data: Data
    isError: boolean
}

type UserResponse = ApiResponse<{ name: string, age: number }>
type BlogResponse = ApiResponse<{ title: string}>

const response: UserResponse = {
    data: {
        name: "Kyle",
        age: 28,
    },
    isError: false,
}

const responseBlog: BlogResponse = {
    data: {
        title: "sdf"
    },
}
