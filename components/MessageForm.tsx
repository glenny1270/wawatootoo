'use client'
import { useState } from 'react'
import { supabase } from '../utils/supabaseClient'

export default function MessageForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase
      .from('messages')
      .insert([{ name, message }])

    setLoading(false)
    if (!error) {
      setSuccess(true)
      setName('')
      setMessage('')
    } else {
      alert('提交失败: ' + error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-gray-900 rounded-lg text-white">
      <h2 className="text-xl mb-2">留言板</h2>
      <input
        className="w-full p-2 mb-2 text-black"
        placeholder="你的名字"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        className="w-full p-2 mb-2 text-black"
        placeholder="留言内容"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded"
      >
        {loading ? '提交中...' : '提交'}
      </button>
      {success && <p className="text-green-400 mt-2">留言成功！</p>}
    </form>
  )
}
