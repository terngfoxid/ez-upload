import fs from 'fs'
import path from 'path'

export default async function handler(req: { query: { filename: any; }; method: any; },res: { setHeader: (arg0: string, arg1: string) => void; send: (arg0: Buffer) => void; status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error: boolean; message: string; }): void; new(): any; }; }; }) {

  //example /api/ship/Allen_M_Sumner
  //ex.2 /api/ship/Allen%20M%20Sumner
  const {
    query: { filename },
    method,
  } = req
  const filenameArray = filename.split(".");
  const filePath = path.join(process.cwd(), '/public/uploads/'+filename)
  try{
  const imageBuffer = fs.readFileSync(filePath)
  res.setHeader('Content-Type', 'image/'+filenameArray[1])
  res.send(imageBuffer)
  }catch{
    res.status(400).json({ error: true, message: 'Image not found' });
  }

}