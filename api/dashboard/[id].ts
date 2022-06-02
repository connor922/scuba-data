import { NextApiHandler } from 'next'
import { supabase } from "../../libs/initSupabase";

const user: NextApiHandler = async(req, res) => {
    const { id } = req.query

    if (req.method === 'POST') {
        // probs do some validation on this?? 
        const { data, error } = await supabase.from("results").upsert(req.body)
        console.log(data);
        console.log(error);
        res.status(200).json(data)
        return
    }

    const { data, error } = await supabase.from("results").select("*").eq('user', id);

    if (data) {
        res.status(200).json(data)
    } else {
        res.status(404).end()
    }
}

export default user
