import React, { useState } from 'react';
import { Heart, Sparkles, Camera, Grid, Layout, ChevronRight, Trophy, Star, BookOpen } from 'lucide-react';

export default function MoodBoard() {
  const [currentPage, setCurrentPage] = useState('love');
  const [loveConfirmed, setLoveConfirmed] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizComplete, setQuizComplete] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Quiz questions
 const quizQuestions = [
    {
      question: "Do you remember what I wore the first day you met me?",
      options: [
        { text: "Blue T-shirt full sleeve", correct: true, emoji: "👕" },
        { text: "A formal shirt", correct: false, emoji: "👔" },
        { text: "A traditional kurta", correct: false, emoji: "🧥" },
        { text: "A comfy hoodie", correct: false, emoji: "🎽" }
      ]
    },
    {
      question: "Do you remember how I proposed to you?",
      options: [
        { text: "On one knee with flowers", correct: false, emoji: "💐" },
        { text: "I said 'Do you marry me?'", correct: true, emoji: "💍" },
        { text: "With a love letter", correct: false, emoji: "💌" },
        { text: "During a candlelight dinner", correct: false, emoji: "🕯️" }
      ]
    },
    {
      question: "What's the first movie we watched together?",
      options: [
        { text: "A romantic comedy", correct: false, emoji: "😂" },
        { text: "An action thriller", correct: false, emoji: "💥" },
        { text: "A comedy horror", correct: true, emoji: "🎬" },
        { text: "A Bollywood romance", correct: false, emoji: "😱" }
      ]
    },
    {
      question: "What's my go-to food that I always crave?",
      options: [
        { text: "Biryani (always!)", correct: true, emoji: "🍛" },
        { text: "Pizza", correct: false, emoji: "🍕" },
        { text: "Momos", correct: false, emoji: "🥟" },
        { text: "Anything sweet", correct: false, emoji: "🍰" }
      ]
    },
    {
      question: "What do I do when I miss you the most?",
      options: [
        { text: "Text you immediately", correct: true, emoji: "📱" },
        { text: "Look at your photos", correct: false, emoji: "📸" },
        { text: "Listen to our favorite songs", correct: false, emoji: "🎵" },
        { text: "All of the above!", correct: false, emoji: "💖" }
      ]
    },
    {
      question: "What's my favorite thing about you?",
      options: [
        { text: "Your beautiful smile", correct: false, emoji: "😊" },
        { text: "Your caring nature", correct: false, emoji: "🤗" },
        { text: "Your sense of humor", correct: false, emoji: "😄" },
        { text: "Everything about you!", correct: true, emoji: "✨" }
      ]
    },
    {
      question: "What's our special song?",
      options: [
        { text: "96 Music", correct: true, emoji: "🎶" },
        { text: "Sudhu Tomake Bhalovese", correct: false, emoji: "🎸" },
        { text: "Sweet melody", correct: false, emoji: "🥁" },
        { text: "We don't have one yet", correct: false, emoji: "❓" }
      ]
    },
    {
      question: "What's the sweetest thing I've ever done for you?",
      options: [
        { text: "Surprised you on your birthday", correct: false, emoji: "🎂" },
        { text: "Stayed up all night talking to you", correct: false, emoji: "🌙" },
        { text: "Wrote you a love letter", correct: true, emoji: "💝" },
        { text: "Made this website for you!", correct: false, emoji: "💻" }
      ]
    }
  ];

  // AUTO-GENERATE 30 PHOTOS
 const photos = Array.from({ length: 30}, (_, i) => ({
  id: i + 1,
  src: `/photos/photo${i + 1}.jpg`,
  category: i % 3 === 0 ? 'selfies' : i % 3 === 1 ? 'together' : 'special',
}));

  const categories = [
    { id: 'all', name: 'All Photos', icon: Grid, color: 'from-purple-500 to-pink-500' },
    { id: 'selfies', name: 'Your Selfies', icon: Camera, color: 'from-pink-500 to-rose-500' },
    { id: 'together', name: 'Us Together', icon: Heart, color: 'from-red-500 to-pink-500' },
    { id: 'special', name: 'Special Moments', icon: Sparkles, color: 'from-blue-500 to-purple-500' },
  ];

  const filteredPhotos = selectedCategory === 'all' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  const moveNoButton = () => {
    const maxX = 300;
    const maxY = 200;
    const newX = Math.random() * maxX - maxX / 2;
    const newY = Math.random() * maxY - maxY / 2;
    setNoButtonPosition({ x: newX, y: newY });
  };

  const handleAnswer = (correct) => {
    const newAnswers = [...answers, correct];
    setAnswers(newAnswers);
    
    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 600);
    } else {
      setTimeout(() => setQuizComplete(true), 600);
    }
  };

  const correctCount = answers.filter(a => a).length;
  const totalQuestions = quizQuestions.length;

  // Love confirmation page
  if (currentPage === 'love' && !loveConfirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 via-red-100 to-purple-100 flex items-center justify-center p-4 overflow-hidden">
        <div className="text-center max-w-2xl">
          <div className="mb-8 animate-bounce">
            <Heart className="w-32 h-32 text-red-500 fill-red-500 mx-auto" />
          </div>
          
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-6 animate-pulse">
            Do You Love Me?
          </h1>
          
          <div className="flex gap-8 justify-center items-center mt-12 relative">
            <button
              onClick={() => {
                setLoveConfirmed(true);
                setTimeout(() => setCurrentPage('menu'), 1000);
              }}
              className="px-16 py-6 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-2xl font-bold rounded-full shadow-2xl hover:scale-110 transition-transform hover:shadow-green-500/50"
            >
              YES! 💚
            </button>
            
            <button
              onMouseEnter={moveNoButton}
              onClick={moveNoButton}
              style={{
                transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
                transition: 'transform 0.3s ease'
              }}
              className="px-16 py-6 bg-gradient-to-r from-red-500 to-pink-600 text-white text-2xl font-bold rounded-full shadow-2xl opacity-50 cursor-not-allowed"
            >
              NO 💔
            </button>
          </div>
          
          <p className="mt-12 text-gray-600 text-lg italic">
            (Hint: There's only one right answer! 😉)
          </p>
        </div>
      </div>
    );
  }

  // Menu page
  if (currentPage === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-4xl w-full">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Welcome My Love!
              </h1>
              <Heart className="w-12 h-12 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
            <p className="text-gray-600 text-xl">Choose what you'd like to explore</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <button
              onClick={() => setCurrentPage('quiz')}
              className="group relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 group-hover:from-purple-500/20 group-hover:to-pink-500/20 transition-all" />
              <div className="relative">
                <BookOpen className="w-20 h-20 text-purple-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Love Quiz</h2>
                <p className="text-gray-600 text-lg">Test how well you know me! 💝</p>
                <ChevronRight className="w-8 h-8 text-purple-500 mx-auto mt-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>

            <button
              onClick={() => setCurrentPage('photos')}
              className="group relative bg-white rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all hover:scale-105 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-blue-500/10 group-hover:from-pink-500/20 group-hover:to-blue-500/20 transition-all" />
              <div className="relative">
                <Camera className="w-20 h-20 text-pink-500 mx-auto mb-6" />
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Memories</h2>
                <p className="text-gray-600 text-lg">Beautiful moments together 📸</p>
                <ChevronRight className="w-8 h-8 text-pink-500 mx-auto mt-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz page
  if (currentPage === 'quiz') {
    if (!quizComplete) {
      const question = quizQuestions[currentQuestion];
      return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
          <div className="max-w-3xl w-full">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold text-gray-700">Question {currentQuestion + 1}/{totalQuestions}</span>
                <button
                  onClick={() => {
                    setCurrentPage('menu');
                    setCurrentQuestion(0);
                    setAnswers([]);
                    setQuizComplete(false);
                  }}
                  className="text-gray-500 hover:text-gray-700 text-sm"
                >
                  Back to Menu
                </button>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl p-10 shadow-2xl">
              <div className="text-center mb-10">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">{question.question}</h2>
                <div className="text-6xl">{question.options[0].emoji}</div>
              </div>

              <div className="grid gap-4">
                {question.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(option.correct)}
                    className="group relative bg-gradient-to-r from-gray-50 to-gray-100 hover:from-purple-50 hover:to-pink-50 rounded-2xl p-6 text-left transition-all hover:scale-105 hover:shadow-lg border-2 border-transparent hover:border-pink-300"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{option.emoji}</span>
                      <span className="text-xl font-medium text-gray-700 group-hover:text-gray-900">{option.text}</span>
                      <ChevronRight className="w-6 h-6 ml-auto text-gray-400 group-hover:text-pink-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Quiz results
    const percentage = (correctCount / totalQuestions) * 100;
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-3xl p-12 shadow-2xl">
            <Trophy className="w-24 h-24 text-yellow-500 mx-auto mb-6 animate-bounce" />
            
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            
            <div className="text-7xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              {correctCount}/{totalQuestions}
            </div>
            
            <div className="mb-8">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-2xl font-semibold text-gray-700">{percentage.toFixed(0)}% Correct!</p>
            </div>
            
            {percentage === 100 && (
              <div className="mb-8">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
                  🎉 PERFECT SCORE! 🎉
                </p>
                <p className="text-lg text-gray-600">You know me so well! You're amazing! 💖</p>
              </div>
            )}
            
            {percentage >= 75 && percentage < 100 && (
              <div className="mb-8">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-2">
                  ✨ Awesome Job! ✨
                </p>
                <p className="text-lg text-gray-600">You know me really well! I love you! 💕</p>
              </div>
            )}
            
            {percentage >= 50 && percentage < 75 && (
              <div className="mb-8">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-2">
                  🌟 Pretty Good! 🌟
                </p>
                <p className="text-lg text-gray-600">We're learning more about each other every day! 💝</p>
              </div>
            )}
            
            {percentage < 50 && (
              <div className="mb-8">
                <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 to-red-600 mb-2">
                  💫 We're Still Learning! 💫
                </p>
                <p className="text-lg text-gray-600">That's what makes our journey exciting! 🥰</p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  setCurrentQuestion(0);
                  setAnswers([]);
                  setQuizComplete(false);
                }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105"
              >
                Try Again
              </button>
              <button
                onClick={() => setCurrentPage('menu')}
                className="px-8 py-4 bg-white border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:shadow-xl transition-all hover:scale-105"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Photos page - 30 PHOTOS WITH REAL IMAGES!
  if (currentPage === 'photos') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
        <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Heart className="w-10 h-10 text-pink-500 fill-pink-500 animate-pulse" />
                <div>
                  <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                    Our Beautiful Memories
                  </h1>
                  <p className="text-gray-600 text-sm mt-1">Every moment with you is special 💕</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setViewMode(viewMode === 'grid' ? 'masonry' : 'grid')}
                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  <Layout className="w-5 h-5" />
                  {viewMode === 'grid' ? 'Masonry' : 'Grid'}
                </button>
                <button
                  onClick={() => {
                    setCurrentPage('menu');
                    setSelectedCategory('all');
                  }}
                  className="px-6 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-full hover:shadow-lg transition-all hover:scale-105"
                >
                  Back
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-3 px-8 py-4 rounded-full transition-all font-semibold ${
                    selectedCategory === cat.id
                      ? `bg-gradient-to-r ${cat.color} text-white shadow-xl scale-110`
                      : 'bg-white text-gray-700 shadow-md hover:shadow-xl hover:scale-105'
                  }`}
                >
                  <Icon className="w-6 h-6" />
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Photo Grid - 30 REAL IMAGES! */}
        <main className="max-w-7xl mx-auto px-4 pb-16">
          <div className={`${
            viewMode === 'grid'
              ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6'
          }`}>
            {filteredPhotos.map(photo => (
              <div
                key={photo.id}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105"
              >
                {/* REAL IMAGE */}
                <img 
                  src={photo.src} 
                  alt={`Photo ${photo.id}`} 
                  className="w-full h-full object-cover aspect-square"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end">
                  <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-pink-400 fill-pink-400 animate-pulse" />
                        <span className="text-white font-semibold text-lg capitalize">{photo.category}</span>
                      </div>
                      <span className="text-white/80 text-sm font-medium">#{photo.id}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPhotos.length === 0 && (
            <div className="text-center py-20">
              <Camera className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <p className="text-gray-500 text-2xl font-medium">No photos in this category yet</p>
              <p className="text-gray-400 mt-2">More memories coming soon! 💕</p>
            </div>
          )}
        </main>

        {/* Footer */}
        <footer className="bg-white/90 backdrop-blur-md border-t-2 border-pink-200 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="flex items-center justify-center gap-3 mb-3">
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
              <p className="text-gray-700 font-bold text-lg">Made with endless love for you</p>
              <Heart className="w-6 h-6 text-pink-500 fill-pink-500 animate-pulse" />
            </div>
            <p className="text-gray-500">Every moment with you is a treasure 💖</p>
          </div>
        </footer>
      </div>
    );
  }
}