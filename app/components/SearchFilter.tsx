'use client'

// SearchFilter is now built into TopNavbar to match the screenshot design.
// This file is kept so existing imports don't break — it renders nothing.

type SearchFilterProps = {
  searchTerm: string
  setSearchTerm: (value: string) => void
  filter: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low'
  setFilter: (
    value: 'all' | 'todo' | 'completed' | 'high' | 'medium' | 'low'
  ) => void
}

export default function SearchFilter(_props: SearchFilterProps) {
  return null
}
