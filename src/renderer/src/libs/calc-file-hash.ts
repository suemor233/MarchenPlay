import CryptoJS from 'crypto-js'

export const calculateFileHash = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader()
  reader.onload = (e) => {
    const fileContent = e.target?.result as string
    const hash = CryptoJS.MD5(CryptoJS.enc.Latin1.parse(fileContent)).toString(CryptoJS.enc.Hex)
    resolve(hash)
  }
  reader.onerror = (error) => {
    reject(error)
  }
  const blob = file.slice(0, 16 * 1024 * 1024) // 取前16MB
  reader.readAsBinaryString(blob)
})
