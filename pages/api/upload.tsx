import formidable, { Fields, IncomingForm } from 'formidable'
import fs from "fs";
import { IncomingMessage } from 'http';

var mv = require('mv');


export const config = {
  api: {
    bodyParser: false,
  }
};

export default async (req: IncomingMessage, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { fileName?: string; error?: string; }): void | PromiseLike<void>; new(): any; }; }; }) => {
  if (req.method === 'POST') {
    const saveFile = async (file: formidable.File | formidable.File[]) => {

      if (!Array.isArray(file)) {
        const data = fs.readFileSync(file.filepath);
        fs.writeFileSync(`./public/uploads/${file.originalFilename}`, await data);
        await fs.unlinkSync(file.filepath);

      }
      return;
    };

    const data = await new Promise((resolve, reject) => {
      const form = new IncomingForm()
      form.parse(req, async (err, fields: formidable.Fields, files: formidable.Files) => {
        if (err) return reject(err)

        await saveFile(files.file);
        if (!Array.isArray(files.file))
          if (files.file.originalFilename != null) {
            return res.status(201).json({ fileName: files.file.originalFilename });
          }
      })
    })
  }
  else res.status(404).json({ error: "Not Found" });
}