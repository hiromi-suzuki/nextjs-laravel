'use client'

import { FormEvent, useEffect, useState } from 'react'

type Todo = { id: number; title: string; completed: boolean; created_at: string }

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/todos', { cache: 'no-store' })
      if (!response.ok) throw new Error('TODO を取得できませんでした。')
      setTodos(await response.json())
    } catch (e) { setError(e instanceof Error ? e.message : 'エラーが発生しました。') }
    finally { setLoading(false) }
  }

  useEffect(() => { void load() }, [])

  const create = async (event: FormEvent) => {
    event.preventDefault()
    if (!title.trim()) return
    const response = await fetch('/api/todos', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title }) })
    if (!response.ok) { setError('TODO を追加できませんでした。'); return }
    setTitle('')
    await load()
  }

  const update = async (todo: Todo, completed: boolean) => {
    const response = await fetch(`/api/todos/${todo.id}`, { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ completed }) })
    if (!response.ok) { setError('TODO を更新できませんでした。'); return }
    await load()
  }

  const remove = async (id: number) => {
    const response = await fetch(`/api/todos/${id}`, { method: 'DELETE' })
    if (!response.ok) { setError('TODO を削除できませんでした。'); return }
    await load()
  }

  return <main>
    <section className="card">
      <p className="eyebrow">NEXT.JS × LARAVEL</p><h1>TODO リスト</h1>
      <form onSubmit={create}><input aria-label="新しいTODO" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="やることを入力" maxLength={255} /><button>追加</button></form>
      {error && <p role="alert" className="error">{error}</p>}
      {loading ? <p>読み込み中...</p> : <ul>{todos.map((todo) => <li key={todo.id}><label><input type="checkbox" checked={todo.completed} onChange={(e) => void update(todo, e.target.checked)} /><span className={todo.completed ? 'done' : ''}>{todo.title}</span></label><button className="delete" onClick={() => void remove(todo.id)} aria-label={`${todo.title}を削除`}>削除</button></li>)}</ul>}
      {!loading && todos.length === 0 && <p className="empty">TODO はまだありません。</p>}
    </section>
  </main>
}
