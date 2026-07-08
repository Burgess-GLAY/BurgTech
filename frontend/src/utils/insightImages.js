// frontend/src/utils/insightImages.js
export const INSIGHT_IMAGE_MAP = {
  'ai':                  'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  'artificial intelligence': 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  'web development':     'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'design':              'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  'ui/ux':               'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&q=80',
  'mobile':              'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
  'cloud':               'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&q=80',
  'security':            'https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=800&q=80',
  'startup':             'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
  'business':            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'devops':              'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'technology':          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'ai_data_science':     'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80',
  'company_news':        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
  'tech_insights':       'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'project_announcement':'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
  'tutorial':            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80',
  'default':             'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80',
};

export function getInsightImage(category = '') {
  const key = category.toLowerCase().trim().replace(/_/g, ' ');
  return INSIGHT_IMAGE_MAP[key] || INSIGHT_IMAGE_MAP['default'];
}
