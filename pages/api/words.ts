import type { NextApiRequest, NextApiResponse } from 'next'
import ThreeLetterWords from '@/data/three-letter-words.json'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const result = ThreeLetterWords
        res.status(200).json({ result })
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}