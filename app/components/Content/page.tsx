'use client';

export default function ContentComponent() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">欢迎使用公司制度 AI 助手</h1>
      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-lg font-medium mb-4">使用说明</h2>
        <div className="space-y-4 text-gray-600">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
            <p>AI 可以回答与公司制度相关的问题，包括但不限于：公司规章制度、工作流程、人事制度等。</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
            <p>人事管理制度：包括考勤、请假、加班、调休等相关规定。</p>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
            <p>点击下方输入框，输入您的问题即可开始对话。</p>
          </div>
        </div>
      </div>
    </div>
  );
}
