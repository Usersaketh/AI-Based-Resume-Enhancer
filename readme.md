# AI Resume Enhancer ✨

**AI Resume Enhancer** is a cutting-edge, AI-powered web application that revolutionizes resume creation and enhancement. Built with modern web technologies, it helps users create ATS-optimized, professional resumes with intelligent suggestions and customizable templates.

![AI Resume Enhancer Banner](https://via.placeholder.com/800x200/1a1a1a/ffffff?text=AI+Resume+Enhancer)

## 🚀 Features

### 🔍 **AI-Powered Resume Enhancement**
- **Smart PDF Upload & Analysis**: Upload your existing resume and get it analyzed instantly
- **Intelligent Suggestions**: Receive personalized, actionable feedback to improve your resume
- **ATS Optimization**: Get specific recommendations to pass Applicant Tracking Systems
- **Job Matching Score**: See how well your resume matches specific job descriptions (scored 1-10)
- **Deep Analysis**: Get detailed insights on ATS compatibility, keyword optimization, and content quality
- **Real-time Preview**: View your uploaded resume with live suggestions overlay

### 🎨 **Professional Resume Generation**
- **4 Professional Templates**: Choose from Standard, Modern, Double Column, and Elegant designs
- **Smart Form Builder**: Fill out an intuitive, multi-step form with guided sections:
  - Basic Details (Contact Information)
  - Education History
  - Technical Experience
  - Skills Assessment
  - Projects Portfolio
  - Certifications
  - Achievements
- **AI Content Assistance**: Get AI-powered suggestions for project descriptions and work experience
- **Live Preview**: See real-time updates as you build your resume
- **PDF Export**: Download high-quality PDF versions instantly
- **Auto-save**: Resume data is automatically saved locally in your browser

### 🤖 **Advanced AI Features**
- **Context-Aware Suggestions**: AI analyzes job descriptions to provide targeted recommendations
- **Quantified Metrics**: Get suggestions for adding specific achievements and metrics
- **ATS Score Analysis**: Detailed scoring from 1-10 with specific improvement areas
- **Professional Content Generation**: AI helps create compelling project and experience descriptions

## 🛠 Technology Stack

### **Frontend**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **React PDF** - PDF viewing and generation
- **React Dropzone** - Drag-and-drop file uploads
- **React to Print** - PDF generation and printing
- **Sonner** - Beautiful toast notifications

### **Backend & APIs**
- **Next.js API Routes** - Serverless API endpoints
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

## 🎨 Available Templates

### **1. Standard Template**
- Clean, traditional layout
- Perfect for corporate environments
- ATS-friendly single-column design

### **2. Modern Template**
- Contemporary design with gradients
- Ideal for tech and creative roles
- Enhanced visual hierarchy

### **3. Double Column Template**
- Two-column layout for more content
- Great for experienced professionals
- Organized side panel for skills/contact

### **4. Elegant Template**
- Sophisticated serif typography
- Perfect for executive positions
- Professional and refined appearance

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

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

### **Development Guidelines**
1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Maintain consistent code formatting
4. Add appropriate error handling
5. Write meaningful commit messages
6. Test on multiple devices and browsers

### **Project Setup for Contributors**
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 🐛 Known Issues & Limitations

- **PDF Upload**: Only supports PDF files (not Word documents)
- **File Size**: Maximum PDF size is limited by browser capabilities
- **AI Responses**: Occasionally may need regeneration for optimal results
- **Browser Storage**: Data is stored locally and not synced across devices

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powering the intelligent analysis and suggestions
- **Next.js team** for the amazing React framework
- **Tailwind CSS** for the utility-first styling approach
- **Vercel** for seamless deployment and hosting
- **React community** for excellent libraries and tools

## 📞 Support & Contact

If you have any questions, suggestions, or need help:

- **GitHub Issues**: [Open an issue](https://github.com/Usersaketh/AI-Based-Resume-Enhancer/issues)
- **Feature Requests**: Use GitHub issues with the "enhancement" label
- **Bug Reports**: Use GitHub issues with the "bug" label

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS Amplify**
- Any platform supporting Node.js applications

### **Environment Variables for Production**
```env
GEMINI_API_KEY=your_production_gemini_api_key
```

---

**Made with ❤️ for better careers and opportunities**

*Helping job seekers create professional, ATS-optimized resumes that get noticed by employers and land interviews.*