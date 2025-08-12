interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
  custom_parameters?: Record<string, any>;
}

class Analytics {
  private isEnabled: boolean = false;

  constructor() {
    // Check if analytics should be enabled (production + consent)
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  // Track page views
  pageView(url: string, title?: string) {
    if (!this.isEnabled) return;
    
    // Integration ready for Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_title: title,
        page_location: url,
      });
    }
  }

  // Track custom events
  event(eventData: AnalyticsEvent) {
    if (!this.isEnabled) return;

    // Integration ready for Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventData.action, {
        event_category: eventData.category,
        event_label: eventData.label,
        value: eventData.value,
        ...eventData.custom_parameters,
      });
    }

    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', eventData);
    }
  }

  // Resume-specific tracking methods
  resumeUploaded(fileSize: number, fileType: string) {
    this.event({
      action: 'resume_uploaded',
      category: 'Resume Enhancement',
      label: fileType,
      value: fileSize,
      custom_parameters: { file_type: fileType }
    });
  }

  suggestionGenerated(suggestionType: string, processingTime: number) {
    this.event({
      action: 'suggestion_generated',
      category: 'AI Processing',
      label: suggestionType,
      value: processingTime,
      custom_parameters: { suggestion_type: suggestionType }
    });
  }

  downloadInitiated(type: 'resume' | 'suggestions' | 'analysis') {
    this.event({
      action: 'download_initiated',
      category: 'User Engagement',
      label: type,
      custom_parameters: { download_type: type }
    });
  }

  errorOccurred(errorType: string, errorMessage: string, page: string) {
    this.event({
      action: 'error_occurred',
      category: 'Errors',
      label: errorType,
      custom_parameters: { 
        error_message: errorMessage,
        page: page
      }
    });
  }
}

export const analytics = new Analytics();

// Performance monitoring
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    analytics.event({
      action: 'web_vital',
      category: 'Performance',
      label: metric.name,
      value: Math.round(metric.value),
      custom_parameters: {
        metric_name: metric.name,
        metric_delta: metric.delta,
        metric_id: metric.id,
      }
    });
  }
}
