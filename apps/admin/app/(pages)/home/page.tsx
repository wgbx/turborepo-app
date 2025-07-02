// import { Button } from 'ui'
import AntdForm from '@admin/components/AntdForm'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8 text-gray-900">管理后台</h1>
        <div className="mb-8">{/* <Button>111</Button> */}</div>
        <AntdForm />
      </div>
    </div>
  )
}
