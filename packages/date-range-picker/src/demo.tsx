import React from 'react'
import DateRangePicker from './DateRangePicker'
import dayjs from 'dayjs'

const DateRangePickerDemo: React.FC = () => {
  const handleChange = (dates: [dayjs.Dayjs, dayjs.Dayjs]) => {
    console.log('选择的日期范围:', dates[0].format('YYYY-MM-DD'), '至', dates[1].format('YYYY-MM-DD'))
  }

  return (
    <div style={{ padding: 40, fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <h1 style={{ marginBottom: 32, color: '#262626' }}>日期范围选择器 - 纯日历面板演示</h1>

      <div style={{ marginBottom: 24 }}>
        <h3 style={{ marginBottom: 16, color: '#595959' }}>功能特性：</h3>
        <ul style={{ color: '#8c8c8c', lineHeight: 1.6 }}>
          <li>
            📅 <strong>纯日历面板</strong> - 弹窗直接显示双日历，无输入框干扰
          </li>
          <li>
            🎯 <strong>直观选择</strong> - 左侧选择开始日期，右侧选择结束日期
          </li>
          <li>✨ 现代化的UI设计，符合当前审美趋势</li>
          <li>🎨 优化的间距和布局，提升用户体验</li>
          <li>🔘 改进的导航按钮，使用SVG图标</li>
          <li>📱 响应式设计，适配不同屏幕尺寸</li>
          <li>🌈 统一的色彩系统，使用蓝色主题</li>
        </ul>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#595959' }}>纯日历面板优势：</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>无干扰体验</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • 弹窗直接显示日历面板
              <br />
              • 没有输入框分散注意力
              <br />
              • 专注于日期选择操作
              <br />• 更简洁的界面设计
            </p>
          </div>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>双面板选择</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • 同时显示两个月份
              <br />
              • 清晰区分开始和结束日期
              <br />
              • 可视化的日期范围选择
              <br />• 支持跨月日期范围
            </p>
          </div>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>交互体验</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • 悬停预览日期范围
              <br />
              • 点击确认选择
              <br />
              • 快捷预设选项
              <br />• 实时日期范围显示
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#595959' }}>样式改进：</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>面板样式</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • 圆角边框 (12px)
              <br />
              • 柔和阴影效果
              <br />
              • 更大的内边距
              <br />• 最小宽度限制
            </p>
          </div>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>按钮样式</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • SVG图标替代文字
              <br />
              • 悬停和点击效果
              <br />
              • 禁用状态样式
              <br />• 统一的按钮尺寸
            </p>
          </div>
          <div style={{ padding: 16, border: '1px solid #f0f0f0', borderRadius: 8, background: '#fafafa' }}>
            <h4 style={{ marginBottom: 8, color: '#262626' }}>日期单元格</h4>
            <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
              • 更大的点击区域
              <br />
              • 圆角设计
              <br />
              • 清晰的选中状态
              <br />• 平滑的过渡动画
            </p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: 32 }}>
        <h3 style={{ marginBottom: 16, color: '#595959' }}>试用纯日历日期选择器：</h3>
        <DateRangePicker onChange={handleChange} />
      </div>

      <div style={{ padding: 16, background: '#f6ffed', border: '1px solid #b7eb8f', borderRadius: 8 }}>
        <h4 style={{ marginBottom: 8, color: '#52c41a' }}>修复完成！</h4>
        <p style={{ margin: 0, color: '#8c8c8c', fontSize: 14 }}>
          日期范围选择器现在正确显示纯日历面板，弹窗中不再包含输入框。
          用户可以直接在双日历面板中选择开始和结束日期，提供了更专注、更直观的日期选择体验。
        </p>
      </div>
    </div>
  )
}

export default DateRangePickerDemo
