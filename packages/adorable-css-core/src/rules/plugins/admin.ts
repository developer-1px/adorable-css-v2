import type { CSSRule, RuleHandler } from '../types';
import { makeColor, px } from '../../values/makeValue';
import { getTokenVar } from '../../tokens';

// admin-panel() - 관리자 패널 스타일
export const adminPanel: RuleHandler = (args?: string): CSSRule => {
  const theme = args || 'dark';
  
  const themes = {
    dark: {
      background: '#1e1e2e',
      border: '1px solid #313244',
      color: '#cdd6f4'
    },
    light: {
      background: '#ffffff',
      border: '1px solid #e5e7eb',
      color: '#374151'
    },
    slate: {
      background: '#0f172a',
      border: '1px solid #1e293b',
      color: '#e2e8f0'
    }
  };
  
  const selectedTheme = themes[theme as keyof typeof themes] || themes.dark;
  
  return {
    ...selectedTheme,
    'border-radius': getTokenVar('radius', 'xl'),
    padding: getTokenVar('spacing', 'lg'),
    'box-shadow': getTokenVar('shadow', 'lg'),
    position: 'relative'
  };
};

// sidebar() - 사이드바 네비게이션
export const sidebar: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  const variants = {
    default: {
      background: '#1e1e2e',
      'border-right': '1px solid #313244'
    },
    minimal: {
      background: 'rgba(30, 30, 46, 0.8)',
      'border-right': '1px solid rgba(49, 50, 68, 0.5)',
      'backdrop-filter': 'blur(10px)'
    },
    floating: {
      background: '#1e1e2e',
      border: '1px solid #313244',
      'border-radius': getTokenVar('radius', '2xl'),
      'box-shadow': getTokenVar('shadow', 'xl')
    }
  };
  
  const selectedVariant = variants[variant as keyof typeof variants] || variants.default;
  
  return {
    ...selectedVariant,
    padding: `${getTokenVar('spacing', 'lg')} ${getTokenVar('spacing', 'md')}`,
    height: '100vh',
    width: '280px',
    position: 'fixed',
    left: '0',
    top: '0',
    'z-index': '1000',
    overflow: 'auto'
  };
};

// data-table() - 데이터 테이블 스타일
export const dataTable: RuleHandler = (args?: string): CSSRule => {
  const style = args || 'striped';
  
  const baseStyles = {
    width: '100%',
    'border-collapse': 'collapse',
    'font-size': getTokenVar('font', 'sm'),
    'line-height': '1.5'
  };
  
  const styles = {
    striped: {
      ...baseStyles,
      'tr:nth-child(even)': {
        background: 'rgba(255, 255, 255, 0.02)'
      }
    },
    bordered: {
      ...baseStyles,
      border: '1px solid #313244',
      'th, td': {
        border: '1px solid #313244',
        padding: `${getTokenVar('spacing', 'sm')} ${getTokenVar('spacing', 'md')}`
      }
    },
    minimal: {
      ...baseStyles,
      'th': {
        'border-bottom': '2px solid #313244',
        padding: `${getTokenVar('spacing', 'md')} ${getTokenVar('spacing', 'sm')}`
      },
      'td': {
        padding: getTokenVar('spacing', 'sm'),
        'border-bottom': '1px solid rgba(49, 50, 68, 0.3)'
      }
    }
  };
  
  return styles[style as keyof typeof styles] || styles.striped as CSSRule;
};

// status-badge() - 상태 배지
export const statusBadge: RuleHandler = (args?: string): CSSRule => {
  const status = args || 'default';
  
  const statuses = {
    success: {
      background: 'rgba(34, 197, 94, 0.1)',
      color: '#22c55e',
      border: '1px solid rgba(34, 197, 94, 0.2)'
    },
    warning: {
      background: 'rgba(251, 191, 36, 0.1)',
      color: '#fbbf24',
      border: '1px solid rgba(251, 191, 36, 0.2)'
    },
    error: {
      background: 'rgba(239, 68, 68, 0.1)',
      color: '#ef4444',
      border: '1px solid rgba(239, 68, 68, 0.2)'
    },
    info: {
      background: 'rgba(59, 130, 246, 0.1)',
      color: '#3b82f6',
      border: '1px solid rgba(59, 130, 246, 0.2)'
    },
    default: {
      background: 'rgba(107, 114, 128, 0.1)',
      color: '#6b7280',
      border: '1px solid rgba(107, 114, 128, 0.2)'
    }
  };
  
  const selectedStatus = statuses[status as keyof typeof statuses] || statuses.default;
  
  return {
    ...selectedStatus,
    padding: `${getTokenVar('spacing', 'xs')} ${getTokenVar('spacing', 'sm')}`,
    'border-radius': getTokenVar('radius', '2xl'),
    'font-size': getTokenVar('font', 'xs'),
    'font-weight': '500',
    display: 'inline-flex',
    'align-items': 'center',
    'white-space': 'nowrap'
  };
};

// metric-card() - 메트릭 카드
export const metricCard: RuleHandler = (args?: string): CSSRule => {
  const variant = args || 'default';
  
  const variants = {
    default: {
      background: '#1e1e2e',
      border: '1px solid #313244'
    },
    gradient: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      border: 'none',
      color: '#ffffff'
    },
    glass: {
      background: 'rgba(30, 30, 46, 0.6)',
      border: '1px solid rgba(49, 50, 68, 0.3)',
      'backdrop-filter': 'blur(10px)'
    }
  };
  
  const selectedVariant = variants[variant as keyof typeof variants] || variants.default;
  
  return {
    ...selectedVariant,
    padding: getTokenVar('spacing', 'lg'),
    'border-radius': getTokenVar('radius', 'xl'),
    'box-shadow': getTokenVar('shadow', 'md'),
    position: 'relative'
  };
};

// nav-item() - 네비게이션 아이템
export const navItem: RuleHandler = (args?: string): CSSRule => {
  const state = args || 'default';
  
  const states = {
    default: {
      color: '#a6adc8',
      background: 'transparent'
    },
    active: {
      color: '#cdd6f4',
      background: 'rgba(137, 180, 250, 0.1)',
      'border-right': '3px solid #89b4fa'
    },
    hover: {
      color: '#cdd6f4',
      background: 'rgba(255, 255, 255, 0.05)'
    }
  };
  
  const selectedState = states[state as keyof typeof states] || states.default;
  
  return {
    ...selectedState,
    padding: `${getTokenVar('spacing', 'sm')} ${getTokenVar('spacing', 'md')}`,
    'border-radius': getTokenVar('radius', 'lg'),
    'font-weight': '500',
    'font-size': getTokenVar('font', 'sm'),
    transition: 'all 0.2s ease',
    cursor: 'pointer',
    display: 'flex',
    'align-items': 'center',
    gap: getTokenVar('spacing', 'sm'),
    'text-decoration': 'none'
  };
};

// progress-bar() - 프로그레스 바
export const progressBar: RuleHandler = (args?: string): CSSRule => {
  const color = args || 'blue';
  
  const colors = {
    blue: '#3b82f6',
    green: '#22c55e',
    red: '#ef4444',
    yellow: '#fbbf24',
    purple: '#a855f7'
  };
  
  const selectedColor = colors[color as keyof typeof colors] || colors.blue;
  
  return {
    width: '100%',
    height: '8px',
    background: 'rgba(255, 255, 255, 0.1)',
    'border-radius': '4px',
    overflow: 'hidden',
    position: 'relative',
    '::after': {
      content: '""',
      position: 'absolute',
      left: '0',
      top: '0',
      height: '100%',
      background: selectedColor,
      'border-radius': '4px',
      transition: 'width 0.3s ease'
    }
  };
};

// dashboard-header() - 대시보드 헤더
export const dashboardHeader: RuleHandler = (): CSSRule => {
  return {
    background: '#1e1e2e',
    'border-bottom': '1px solid #313244',
    padding: `${getTokenVar('spacing', 'md')} ${getTokenVar('spacing', 'lg')}`,
    position: 'sticky',
    top: '0',
    'z-index': '100',
    'backdrop-filter': 'blur(10px)'
  };
};

export const adminRules = {
  'admin-panel': adminPanel,
  sidebar,
  'data-table': dataTable,
  'status-badge': statusBadge,
  'metric-card': metricCard,
  'nav-item': navItem,
  'progress-bar': progressBar,
  'dashboard-header': dashboardHeader
};