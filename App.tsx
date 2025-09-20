
import React, { useState, useCallback } from 'react';
import { generateInventionIdeas, generateImageForIdea } from './services/geminiService';
import type { Idea, IdeaText } from './types';
import TopicInput from './components/TopicInput';
import IdeaCard from './components/IdeaCard';
import LoadingSpinner from './components/LoadingSpinner';
import { SparklesIcon } from './components/icons/SparklesIcon';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>('');
  const [synthesis, setSynthesis] = useState<string>('');
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (topic: string) => {
    if (!topic.trim()) {
      setError('Please enter a topic.');
      return;
    }

    setIsLoading(true);
    setSynthesis('');
    setIdeas([]);
    setError(null);

    try {
      setLoadingMessage('Step 1/3: Synthesizing research and identifying opportunities...');
      const ideaTextsResponse = await generateInventionIdeas(topic);

      setSynthesis(ideaTextsResponse.synthesis);

      setLoadingMessage('Step 2/3: Generating visual concepts for each idea...');
      const ideasWithImages: Idea[] = await Promise.all(
        ideaTextsResponse.ideas.map(async (ideaText: IdeaText, index: number): Promise<Idea> => {
           setLoadingMessage(`Step 2/3: Generating visual concept ${index + 1}/${ideaTextsResponse.ideas.length}...`);
          const imageUrl = await generateImageForIdea(
            `A visually appealing, high-quality concept art for a new invention: ${ideaText.pitch}. Style: futuristic, clean, product diagram.`
          );
          return { ...ideaText, imageUrl };
        })
      );

      setLoadingMessage('Step 3/3: Finalizing your invention portfolio...');
      setIdeas(ideasWithImages);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred. Please check the console.');
    } finally {
      setIsLoading(false);
      setLoadingMessage('');
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-10">
          <div className="flex items-center justify-center gap-4 mb-4">
            <SparklesIcon className="w-10 h-10 text-cyan-400" />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
              AI Co-Inventor
            </h1>
          </div>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Your personal research and ideation partner. Turn a broad topic into tangible, multi-faceted concepts with AI-powered synthesis and prototyping.
          </p>
        </header>

        <TopicInput onSubmit={handleSubmit} isLoading={isLoading} />

        {error && (
          <div className="mt-8 text-center bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg max-w-3xl mx-auto">
            <p><strong>Error:</strong> {error}</p>
          </div>
        )}

        {isLoading && <LoadingSpinner message={loadingMessage} />}

        {synthesis && !isLoading && (
          <section className="mt-12 animate-fade-in">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-300 text-center">Research Synthesis</h2>
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700">
              <p className="text-gray-300 leading-relaxed">{synthesis}</p>
            </div>
          </section>
        )}

        {ideas.length > 0 && !isLoading && (
          <section className="mt-12 animate-fade-in" style={{ animationDelay: '200ms' }}>
            <h2 className="text-2xl font-semibold mb-6 text-cyan-300 text-center">Generated Concepts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ideas.map((idea, index) => (
                <IdeaCard key={index} idea={idea} />
              ))}
            </div>
          </section>
        )}
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini AI</p>
      </footer>
    </div>
  );
};

export default App;
