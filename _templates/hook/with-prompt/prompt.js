// https://github.com/enquirer/enquirer

module.exports = [
    {
        type: 'input',
        name: 'name',
        message: '请以use开头，输入hook名称，请使用小驼峰式命名法（camelCase）',
        validate(val) {
            if (/^(use)[0-9a-zA-Z_]+$/.test(val)) {
                return true
            }
            return '小驼峰hook命名，只允许输入字母、数字、下划线，例如useState'
        },
    },
]
