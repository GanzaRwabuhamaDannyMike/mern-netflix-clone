// tv.controller.js
import { fetchFromTMDB } from '../services/tmdb.service.js'

export async function getTrendingTvs(req, res) {
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/trending/tv/day?language=en-US`);
        const randomTv = data.results[Math.floor(Math.random() * data.results?.length)];

        res.json({ success: true, content: [randomTv] }); // Ensure content is an array
    } catch (error) {
        console.log("Error in getTrendingTvs controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getTvTrailers(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.json({ success: true, content: data.results }); // Ensure content is an array
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv Trailer not found" });
        }
        console.log("Error in getTvTrailers controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getTvDetails(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: [data] }); // Ensure content is an array
    } catch (error) {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv Details not found" });
        }
        console.log("Error in getTvDetails controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getSimilarTvs(req, res) {
    const { id } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`);
        res.status(200).json({ success: true, content: data.results }); // Ensure content is an array
    } catch (error) {
        console.log("Error in getSimilarTvs controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export async function getTvsByCategory(req, res) {
    const { category } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US`);
        res.status(200).json({ success: true, content: data.results }); // Ensure content is an array
    } catch (error) {
        console.log("Error in getTvsByCategory controller", error.message);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
