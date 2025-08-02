
# 🤖 ResumeGPT - AI-Powered Resume Enhancement Platform

[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google AI](https://img.shields.io/badge/Google_AI-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

**ResumeGPT** is a cutting-edge, AI-powered platform that revolutionizes resume creation and enhancement. Built with modern web technologies and powered by Google's Gemini AI, it helps professionals create ATS-optimized resumes that stand out in today's competitive job market.

## ✨ Key Features

### 🔍 **Smart Resume Enhancement**
- **📄 PDF Upload & Analysis** - Upload existing resumes for instant AI-powered analysis
- **🎯 ATS Optimization** - Get specific recommendations to pass Applicant Tracking Systems
- **📊 Deep Analytics** - Comprehensive scoring with detailed improvement suggestions
- **🏆 Benchmarking** - Compare your resume against industry standards
- **💡 Intelligent Suggestions** - Personalized, actionable feedback for every section

### 🎨 **Professional Resume Generation**
- **4 Premium Templates** - Standard, Modern, Double Column, and Elegant designs
- **📝 Smart Form Builder** - Intuitive multi-step forms with AI assistance
- **🤖 AI Content Generation** - Get help writing compelling descriptions
- **👀 Live Preview** - Real-time updates as you build your resume
- **📱 Mobile Optimized** - Perfect experience across all devices
- **💾 Auto-save** - Never lose your progress with automatic local storage

### 🚀 **Advanced AI Capabilities**
- **Powered by Google Gemini AI** for superior natural language processing
- **Context-aware suggestions** based on your industry and experience level
- **Quantified achievements** recommendations with specific metrics
- **Cover letter generation** tailored to your resume and target role
- **Technical skills optimization** for better keyword matching

## 🔧 Technical Features

### **AI Analysis Engine**
- **Smart Scoring**: Comprehensive 1-10 rating system with detailed criteria
- **Contextual Analysis**: Job description matching and keyword optimization
- **ATS Compatibility**: Specific recommendations for tracking system optimization
- **Content Enhancement**: Professional writing suggestions and improvements

### **State Management**
- **Local Persistence**: All data saved automatically in browser storage
- **Real-time Updates**: Instant preview updates as you type
- **Template Switching**: Seamless switching between designs without data loss
- **Auto-save**: Never lose your progress with automatic saving

### **Performance Optimizations**
- **Fast Loading**: Optimized bundle size and lazy loading
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Error Handling**: Comprehensive error boundaries and user feedback
- **Type Safety**: Full TypeScript implementation for reliability


## 🛠 Technology Stack

### **Frontend**
- **Next.js 14** with App Router for optimal performance
- **TypeScript** for type-safe development
- **Tailwind CSS** for responsive, modern styling
- **React PDF** for document viewing and generation
- **Zustand** for efficient state management
- **Lucide React** for beautiful, consistent icons

### **Backend & AI**
- **Next.js API Routes** for serverless backend
- **Google Gemini AI** for advanced language processing
- **PDF parsing** with secure file handling
- **Caching system** for improved performance

### **UI/UX**
- **Responsive Design** - Mobile-first approach
- **Dark Theme** with professional aesthetics
- **Loading Skeletons** for better perceived performance
- **Error Boundaries** for graceful error handling
- **Progress Indicators** for long-running operations
- **Google Gemini AI** - Advanced AI content generation and analysis
- **PDF Text Extraction** - Intelligent resume parsing

### **State Management & UI**
- **Zustand** - Lightweight state management with local persistence
- **Lucide React** - Beautiful, customizable icons
- **Tailwind Animate** - Smooth animations and transitions

## 🎯 Key Features & Improvements

### **AI-Powered Analysis**
1. **Enhanced Scoring System**: Comprehensive 1-10 scoring with detailed criteria
2. **Job-Specific Analysis**: Tailored suggestions based on job descriptions
3. **ATS Optimization**: Specific recommendations for Applicant Tracking Systems
4. **Quantified Achievements**: AI suggests metrics and measurable accomplishments
5. **Keyword Optimization**: Identifies missing keywords and phrases

### **User Experience**
1. **Intuitive Interface**: Clean, modern design with step-by-step guidance
2. **Real-time Preview**: Live updates as you build your resume
3. **Auto-save Functionality**: Never lose your progress
4. **Mobile Responsive**: Works perfectly on all devices
5. **Fast Performance**: Optimized for speed and efficiency

### **Template System**
1. **Professional Designs**: 4 carefully crafted, ATS-friendly templates
2. **Customizable Layouts**: Each template optimized for different career levels
3. **Print-Ready**: High-quality PDF output for professional use
4. **Template Switching**: Easily switch between templates without losing data

### **Smart Forms**
1. **Multi-step Navigation**: Organized sections with progress tracking
2. **AI Content Assistance**: Get help writing compelling descriptions
3. **Form Validation**: Intelligent validation and error prevention
4. **Data Persistence**: Local storage ensures data is never lost

## 🚀 Getting Started

### **Prerequisites**
- Node.js (v18 or higher)
- npm or yarn package manager
- Google Gemini API key

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Usersaketh/AI-Based-Resume-Enhancer.git
   cd AI-Based-Resume-Enhancer
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   # Google Gemini AI Configuration
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### **Getting Your Gemini API Key**
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key and add it to your `.env.local` file

## 📁 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── api/                      # API endpoints
│   │   ├── enhance-resume/       # Resume enhancement APIs
│   │   └── generate-resume/      # Resume generation APIs
│   ├── enhance-resume/           # Resume enhancement pages
│   │   └── upload-resume/        # Upload and analyze resume
│   ├── generate-resume/          # Resume generation pages
│   │   └── resume-templates/     # Template selection
│   ├── globals.css               # Global styles
│   ├── layout.tsx               # Root layout with navbar
│   ├── page.tsx                 # Home page
│   └── not-found.tsx            # 404 page
├── components/                   # Reusable React components
│   ├── enhance-resume/          # Enhancement-specific components
│   ├── generate-resume/         # Generation-specific components
│   │   ├── forms/               # Form components for each section
│   │   └── resume-templates/    # Template-specific components
│   ├── global/                  # Shared components (navbar, etc.)
│   └── ui/                      # Base UI components
├── lib/                         # Utility functions and types
│   ├── utils/                   # Utility functions
│   │   └── fileUtils.ts         # File handling utilities
│   ├── constant.ts              # Constants and template configurations
│   ├── firestore-functions.ts   # Firebase/Firestore utilities
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # General utilities
├── store/                       # Zustand state management
│   ├── enhance-resume-store.ts  # Enhancement state
│   └── generate-resume-store.ts # Generation state
├── firebase.ts                 # Firebase configuration
└── middleware.ts               # Next.js middleware
```

## 🎮 How to Use

### **Enhance Existing Resume**
1. **Upload Resume**: Click "Enhance Resume" and upload your PDF resume
2. **Add Job Description**: Paste the job description you're targeting
3. **Get Analysis**: Receive detailed AI analysis with:
   - ATS compatibility score (1-10)
   - Missing keywords identification
   - Specific improvement suggestions
   - Quantified achievement recommendations
4. **Review Suggestions**: Browse through categorized suggestions
5. **Apply Changes**: Use the insights to improve your resume

### **Generate New Resume**
1. **Choose Template**: Select from 4 professional templates
2. **Fill Sections**: Complete the multi-step form:
   - Basic details and contact information
   - Education history with scores and duration
   - Technical experience with AI-assisted descriptions
   - Skills and expertise areas
   - Projects with AI-generated descriptions
   - Certifications and achievements
3. **Preview Live**: See real-time updates as you build
4. **Download PDF**: Export high-quality PDF when ready
5. **Switch Templates**: Try different designs without losing data

## 💻 Performance & Optimization

### **Bundle Size**
- **Total**: ~200KB (optimized for fast loading)
- **Code Splitting**: Dynamic imports for better performance
- **Caching**: Intelligent API response caching
- **Compression**: Gzip/Brotli compression enabled

### **User Experience**
- **Loading States**: Skeleton loaders for better perceived performance
- **Error Handling**: Graceful error boundaries and retry mechanisms
- **Mobile Optimized**: Perfect responsive design across all devices
- **Accessibility**: ARIA labels and semantic HTML structure

### **Security Features**
- **API Key Protection**: Server-side only access to sensitive keys
- **Input Validation**: Comprehensive sanitization of user inputs
- **File Security**: PDF-only uploads with content validation
- **CORS Configuration**: Controlled API access patterns

## 🚀 Deployment

### **Vercel (Recommended)**
```bash
# Deploy to Vercel
npm install -g vercel
vercel

# Add environment variables in Vercel dashboard:
# GEMINI_API_KEY=your_api_key
```

### **Netlify**
```bash
# Build command
npm run build

# Publish directory
.next

# Environment variables
GEMINI_API_KEY=your_api_key
```

### **Docker**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📊 Features Comparison

| Feature | ResumeGPT | Competitors |
|---------|-----------|-------------|
| AI-Powered Analysis | ✅ Google Gemini | ❌ |
| ATS Optimization | ✅ Advanced Scoring | ⚠️ Basic |
| Mobile Responsive | ✅ Perfect | ⚠️ Limited |
| Template Quality | ✅ 4 Professional | ⚠️ Generic |
| Real-time Preview | ✅ Live Updates | ❌ |
| Auto-save | ✅ Local Storage | ❌ |
| PDF Export | ✅ High Quality | ⚠️ Watermarked |
| Open Source | ✅ MIT License | ❌ |

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### **Development Setup**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit your changes: `git commit -m 'Add amazing feature'`
5. Push to the branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

### **Contribution Guidelines**
- Follow TypeScript best practices
- Maintain responsive design principles
- Add tests for new features
- Update documentation as needed
- Ensure accessibility compliance

### **Areas for Contribution**
- 🎨 New resume templates
- 🤖 Enhanced AI prompts and analysis
- 🌐 Internationalization (i18n)
- ♿ Accessibility improvements
- 🧪 Testing coverage
- 📱 PWA features

## 🐛 Known Issues & Limitations

### **Current Limitations**
- PDF parsing works best with text-based PDFs
- Image-heavy resumes may have limited analysis
- Complex formatting might not be fully preserved
- Rate limiting may apply based on API usage

### **Planned Improvements**
- [ ] Multi-language support
- [ ] Advanced template customization
- [ ] User account system
- [ ] Resume analytics dashboard
- [ ] Integration with job boards
- [ ] AI-powered interview preparation
- [ ] Team collaboration features

## 📞 Support & Community

### **Getting Help**
- 📖 **Documentation**: Check this README and code comments
- 🐛 **Issues**: Report bugs on GitHub Issues
- 💬 **Discussions**: Join GitHub Discussions for questions
- 📧 **Email**: Contact us at sakethdussa1234@gmail.com

### **Community**
- ⭐ Star the repository if you find it helpful
- 🐦 Follow us on Twitter for updates
- 📱 Share with your network
- 💡 Submit feature requests and feedback

## 🎉 Acknowledgments

- **Google AI** for providing the powerful Gemini API
- **Next.js Team** for the excellent React framework
- **Tailwind CSS** for the utility-first CSS framework
- **Open Source Community** for inspiration and contributions

---

<div align="center">

**Made with ❤️ by the ResumeGPT Team**

[⭐ Star this project](https://github.com/Usersaketh/AI-Based-Resume-Enhancer) | [🐛 Report Issues](https://github.com/Usersaketh/AI-Based-Resume-Enhancer/issues) | [💡 Feature Requests](https://github.com/Usersaketh/AI-Based-Resume-Enhancer/discussions)
