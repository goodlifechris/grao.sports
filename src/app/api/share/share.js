export default function handler(req, res) {
    if (req.method === 'POST') {
      // Handle share data
      const { title, text, url } = req.body;
      
      // Process the shared content
      console.log('Shared content:', { title, text, url });
      
      // You can save to database, process the content, etc.
      
      // Redirect to your app with the shared data
      res.redirect(302, `/share-result?title=${encodeURIComponent(title || '')}&text=${encodeURIComponent(text || '')}&url=${encodeURIComponent(url || '')}`);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  }