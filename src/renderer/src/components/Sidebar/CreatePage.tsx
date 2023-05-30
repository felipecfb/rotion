import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Plus } from 'phosphor-react'
import { Document } from '@shared/types/ipc'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function CreatePage() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { isLoading: isCreatingNewDocument, mutateAsync: createDocument } =
    useMutation(
      async () => {
        const response = await window.api.createDocument()

        return response.data
      },
      {
        onSuccess: (data) => {
          queryClient.setQueriesData<Document[]>(['documents'], (documents) => {
            if (documents && documents?.length >= 0) {
              return [...documents, data]
            } else {
              return [data]
            }
          })

          navigate(`/documents/${data.id}`)
        },
      },
    )

  useEffect(() => {
    function onNewDocument() {
      createDocument()
    }

    const unsubscribe = window.api.onNewDocumentRequest(onNewDocument)

    return () => {
      unsubscribe()
    }
  }, [createDocument])

  const handleCreateDocument = () => {
    createDocument()
  }

  return (
    <button
      onClick={handleCreateDocument}
      disabled={isCreatingNewDocument}
      className="flex w-[240px] px-5 items-center text-sm gap-2 absolute bottom-10 left-0 right-0 py-4 border-t border-rotion-600 hover:bg-rotion-700 disabled:opacity-60"
    >
      <Plus className="h-4 w-4" />
      Novo documento
    </button>
  )
}
