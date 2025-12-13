interface ApiResponse<T = any> {
  success: boolean
  data?: T  // 使うときにTに具体的な型を入れることでdataの中身を指定できる
  error?: string
  timestamp?: string
}