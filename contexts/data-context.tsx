"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

// Definir tipos
export interface Person {
  id: string
  name: string
  totalLoaned: number
  totalPaid: number
  balance: number
  status: "Pagado" | "Pendiente"
}

export interface Transaction {
  id: string
  personId: string
  type: "Préstamo" | "Pago"
  amount: number
  description: string
  date: string
}

export interface SharedLink {
  id: string
  personId: string
  personName: string
  url: string
  createdAt: string
  expiresAt: string
  includesTransactions: boolean
  includesPersonalInfo: boolean
  isPasswordProtected: boolean
  views: number
}

// Datos de ejemplo para inicializar
const examplePeople: Person[] = [
  {
    id: "1",
    name: "Carlos Rodríguez",
    totalLoaned: 150000,
    totalPaid: 50000,
    balance: 100000,
    status: "Pendiente",
  },
  {
    id: "2",
    name: "María González",
    totalLoaned: 75000,
    totalPaid: 75000,
    balance: 0,
    status: "Pagado",
  },
  {
    id: "3",
    name: "Juan Pérez",
    totalLoaned: 200000,
    totalPaid: 50000,
    balance: 150000,
    status: "Pendiente",
  },
  {
    id: "4",
    name: "Jose Castillo",
    totalLoaned: 496460,
    totalPaid: 198584,
    balance: 297876,
    status: "Pendiente",
  },
  {
    id: "5",
    name: "Barbara",
    totalLoaned: 30000,
    totalPaid: 0,
    balance: 30000,
    status: "Pendiente",
  },
  {
    id: "6",
    name: "Jose",
    totalLoaned: 381480,
    totalPaid: 0,
    balance: 381480,
    status: "Pendiente",
  },
  {
    id: "7",
    name: "Keiber",
    totalLoaned: 278222,
    totalPaid: 0,
    balance: 278222,
    status: "Pendiente",
  },
  {
    id: "8",
    name: "Pedro",
    totalLoaned: 240000,
    totalPaid: 40000,
    balance: 200000,
    status: "Pendiente",
  },
]

// Datos de transacciones de ejemplo
const exampleTransactions: Record<string, Transaction[]> = {
  "1": [
    {
      id: "101",
      personId: "1",
      type: "Préstamo",
      amount: 100000,
      description: "Préstamo para reparación de auto",
      date: "2023-12-15T00:00:00.000Z",
    },
    {
      id: "102",
      personId: "1",
      type: "Préstamo",
      amount: 50000,
      description: "Préstamo para gastos médicos",
      date: "2024-01-20T00:00:00.000Z",
    },
    {
      id: "103",
      personId: "1",
      type: "Pago",
      amount: 50000,
      description: "Primer pago",
      date: "2024-02-10T00:00:00.000Z",
    },
  ],
  "2": [
    {
      id: "201",
      personId: "2",
      type: "Préstamo",
      amount: 75000,
      description: "Préstamo para compra de laptop",
      date: "2023-11-05T00:00:00.000Z",
    },
    {
      id: "202",
      personId: "2",
      type: "Pago",
      amount: 25000,
      description: "Primer pago",
      date: "2023-12-05T00:00:00.000Z",
    },
    {
      id: "203",
      personId: "2",
      type: "Pago",
      amount: 25000,
      description: "Segundo pago",
      date: "2024-01-05T00:00:00.000Z",
    },
    {
      id: "204",
      personId: "2",
      type: "Pago",
      amount: 25000,
      description: "Pago final",
      date: "2024-02-05T00:00:00.000Z",
    },
  ],
  "3": [
    {
      id: "301",
      personId: "3",
      type: "Préstamo",
      amount: 200000,
      description: "Préstamo para matrícula universitaria",
      date: "2024-01-10T00:00:00.000Z",
    },
    {
      id: "302",
      personId: "3",
      type: "Pago",
      amount: 50000,
      description: "Primer pago",
      date: "2024-02-10T00:00:00.000Z",
    },
  ],
  "4": [
    {
      id: "401",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2023-12-01T00:00:00.000Z",
    },
    {
      id: "402",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-01-01T00:00:00.000Z",
    },
    {
      id: "403",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-02-01T00:00:00.000Z",
    },
    {
      id: "404",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-03-01T00:00:00.000Z",
    },
    {
      id: "405",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-04-01T00:00:00.000Z",
    },
    {
      id: "406",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-05-01T00:00:00.000Z",
    },
    {
      id: "407",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-06-01T00:00:00.000Z",
    },
    {
      id: "408",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-07-01T00:00:00.000Z",
    },
    {
      id: "409",
      personId: "4",
      type: "Préstamo",
      amount: 49646,
      description: "Monto de la Cuota",
      date: "2024-08-01T00:00:00.000Z",
    },
    {
      id: "410",
      personId: "4",
      type: "Préstamo",
      amount: 100000,
      description: "Pidio 100 prestado",
      date: "2024-09-01T00:00:00.000Z",
    },
    {
      id: "411",
      personId: "4",
      type: "Pago",
      amount: 49646,
      description: "Pago",
      date: "2023-12-15T00:00:00.000Z",
    },
    {
      id: "412",
      personId: "4",
      type: "Pago",
      amount: 49646,
      description: "Pago 05/01/2025",
      date: "2025-01-05T00:00:00.000Z",
    },
    {
      id: "413",
      personId: "4",
      type: "Pago",
      amount: 49646,
      description: "Pago 06/02/2025",
      date: "2025-02-06T00:00:00.000Z",
    },
    {
      id: "414",
      personId: "4",
      type: "Pago",
      amount: 49646,
      description: "Pago 06/03/2025",
      date: "2025-03-06T00:00:00.000Z",
    },
  ],
  "5": [
    {
      id: "501",
      personId: "5",
      type: "Préstamo",
      amount: 30000,
      description: "Préstamo personal",
      date: "2024-03-15T00:00:00.000Z",
    },
  ],
  "6": [
    {
      id: "601",
      personId: "6",
      type: "Préstamo",
      amount: 381480,
      description: "Préstamo personal",
      date: "2024-03-20T00:00:00.000Z",
    },
    {
      "personId": "6",
      "type": "Préstamo",
      "amount": 340000,
      "description": "Prestamo arriendo",
      "date": "2025-04-04T00:00:00.000Z",
      "id": "1743781102089"
    }
  ],
  "7": [
    {
      id: "701",
      personId: "7",
      type: "Préstamo",
      amount: 30000,
      description: "Préstamo personal",
      date: "2024-03-01T00:00:00.000Z",
    },
    {
      id: "702",
      personId: "7",
      type: "Préstamo",
      amount: 130000,
      description: "Préstamo para televisor",
      date: "2024-03-10T00:00:00.000Z",
    },
    {
      id: "703",
      personId: "7",
      type: "Préstamo",
      amount: 118222,
      description: "Préstamo para mouse",
      date: "2024-03-15T00:00:00.000Z",
    },
  ],
  "8": [
    {
      id: "801",
      personId: "8",
      type: "Préstamo",
      amount: 240000,
      description: "Préstamo para moto - 6 cuotas de $40.000",
      date: "2024-03-01T00:00:00.000Z",
    },
    {
      id: "802",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 1/6",
      date: "2024-04-01T00:00:00.000Z",
    },
    {
      id: "803",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 2/6 (Programada)",
      date: "2024-05-01T00:00:00.000Z",
    },
    {
      id: "804",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 3/6 (Programada)",
      date: "2024-06-01T00:00:00.000Z",
    },
    {
      id: "805",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 4/6 (Programada)",
      date: "2024-07-01T00:00:00.000Z",
    },
    {
      id: "806",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 5/6 (Programada)",
      date: "2024-08-01T00:00:00.000Z",
    },
    {
      id: "807",
      personId: "8",
      type: "Pago",
      amount: 40000,
      description: "Cuota 6/6 (Programada)",
      date: "2024-09-01T00:00:00.000Z",
    },
  ],
}

// Datos de ejemplo para enlaces compartidos
const exampleSharedLinks: SharedLink[] = [
  {
    id: "1",
    personId: "4",
    personName: "Jose Castillo",
    url: "https://example.com/shared/abc123",
    createdAt: "2024-03-15T10:30:00.000Z",
    expiresAt: "2024-04-15T10:30:00.000Z",
    includesTransactions: true,
    includesPersonalInfo: false,
    isPasswordProtected: true,
    views: 3,
  },
  {
    id: "2",
    personId: "5",
    personName: "Barbara",
    url: "https://example.com/shared/def456",
    createdAt: "2024-03-20T14:45:00.000Z",
    expiresAt: "2024-03-27T14:45:00.000Z",
    includesTransactions: true,
    includesPersonalInfo: true,
    isPasswordProtected: false,
    views: 1,
  },
  {
    id: "3",
    personId: "8",
    personName: "Pedro",
    url: "https://example.com/shared/ghi789",
    createdAt: "2024-03-25T09:15:00.000Z",
    expiresAt: "2024-04-25T09:15:00.000Z",
    includesTransactions: false,
    includesPersonalInfo: false,
    isPasswordProtected: false,
    views: 0,
  },
]

// Definir la interfaz del contexto
interface DataContextType {
  people: Person[]
  setPeople: (people: Person[]) => void
  addPerson: (person: Omit<Person, "id" | "totalLoaned" | "totalPaid" | "balance" | "status">) => void
  deletePerson: (id: string) => void
  updatePerson: (person: Person) => void
  getPerson: (id: string) => Person | undefined

  getTransactions: (personId: string) => Transaction[]
  addTransaction: (transaction: Omit<Transaction, "id">) => void
  deleteTransaction: (personId: string, transactionId: string) => void
  updateTransactions: (personId: string, transactions: Transaction[]) => void

  sharedLinks: SharedLink[]
  addSharedLink: (link: Omit<SharedLink, "id" | "createdAt" | "views">) => void
  deleteSharedLink: (id: string) => void
  incrementLinkViews: (id: string) => void

  exportData: () => void
  importData: (data: string) => boolean
}

// Crear el contexto
const DataContext = createContext<DataContextType | undefined>(undefined)

// Proveedor del contexto
export function DataProvider({ children }: { children: ReactNode }) {
  const [people, setPeople] = useState<Person[]>([])
  const [transactions, setTransactions] = useState<Record<string, Transaction[]>>({})
  const [sharedLinks, setSharedLinks] = useState<SharedLink[]>([])
  const [isInitialized, setIsInitialized] = useState(false)

  // Cargar datos al iniciar
  useEffect(() => {
    const loadData = () => {
      try {
        // Cargar personas
        const savedPeople = localStorage.getItem("loanTracker_people")
        if (savedPeople) {
          setPeople(JSON.parse(savedPeople))
        } else {
          setPeople(examplePeople)
          localStorage.setItem("loanTracker_people", JSON.stringify(examplePeople))
        }

        // Cargar transacciones
        const loadedTransactions: Record<string, Transaction[]> = {}

        // Primero intentamos cargar desde localStorage
        examplePeople.forEach((person) => {
          const savedTransactions = localStorage.getItem(`loanTracker_transactions_${person.id}`)
          if (savedTransactions) {
            loadedTransactions[person.id] = JSON.parse(savedTransactions)
          } else if (exampleTransactions[person.id]) {
            // Si no hay en localStorage, usamos los datos de ejemplo
            loadedTransactions[person.id] = exampleTransactions[person.id]
            localStorage.setItem(
              `loanTracker_transactions_${person.id}`,
              JSON.stringify(exampleTransactions[person.id]),
            )
          } else {
            loadedTransactions[person.id] = []
          }
        })

        setTransactions(loadedTransactions)

        // Cargar enlaces compartidos
        const savedLinks = localStorage.getItem("loanTracker_sharedLinks")
        if (savedLinks) {
          setSharedLinks(JSON.parse(savedLinks))
        } else {
          setSharedLinks(exampleSharedLinks)
          localStorage.setItem("loanTracker_sharedLinks", JSON.stringify(exampleSharedLinks))
        }

        setIsInitialized(true)
      } catch (error) {
        console.error("Error al cargar datos:", error)
        // En caso de error, inicializar con datos de ejemplo
        setPeople(examplePeople)
        setTransactions(exampleTransactions)
        setSharedLinks(exampleSharedLinks)
        setIsInitialized(true)
      }
    }

    loadData()
  }, [])

  // Guardar datos cuando cambian
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("loanTracker_people", JSON.stringify(people))
    }
  }, [people, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem("loanTracker_sharedLinks", JSON.stringify(sharedLinks))
    }
  }, [sharedLinks, isInitialized])

  // Funciones para manejar personas
  const addPerson = (personData: Omit<Person, "id" | "totalLoaned" | "totalPaid" | "balance" | "status">) => {
    const newPerson: Person = {
      id: Date.now().toString(),
      name: personData.name,
      totalLoaned: 0,
      totalPaid: 0,
      balance: 0,
      status: "Pendiente",
    }

    setPeople((prev) => [...prev, newPerson])
    setTransactions((prev) => ({
      ...prev,
      [newPerson.id]: [],
    }))
  }

  const deletePerson = (id: string) => {
    setPeople((prev) => prev.filter((p) => p.id !== id))

    // Eliminar transacciones asociadas
    setTransactions((prev) => {
      const newTransactions = { ...prev }
      delete newTransactions[id]
      localStorage.removeItem(`loanTracker_transactions_${id}`)
      return newTransactions
    })

    // Eliminar enlaces compartidos asociados
    setSharedLinks((prev) => prev.filter((link) => link.personId !== id))
  }

  const updatePerson = (updatedPerson: Person) => {
    setPeople((prev) => prev.map((p) => (p.id === updatedPerson.id ? updatedPerson : p)))
  }

  const getPerson = (id: string) => {
    return people.find((p) => p.id === id)
  }

  // Funciones para manejar transacciones
  const getTransactions = (personId: string) => {
    return transactions[personId] || []
  }

  const addTransaction = (transaction: Omit<Transaction, "id">) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
    }

    setTransactions((prev) => {
      const personTransactions = [...(prev[transaction.personId] || []), newTransaction]

      // Guardar en localStorage
      localStorage.setItem(`loanTracker_transactions_${transaction.personId}`, JSON.stringify(personTransactions))

      return {
        ...prev,
        [transaction.personId]: personTransactions,
      }
    })

    // Actualizar totales de la persona
    const person = people.find((p) => p.id === transaction.personId)
    if (person) {
      const personTransactions = [...(transactions[transaction.personId] || []), newTransaction]
      const totalLoaned = personTransactions.filter((t) => t.type === "Préstamo").reduce((sum, t) => sum + t.amount, 0)
      const totalPaid = personTransactions.filter((t) => t.type === "Pago").reduce((sum, t) => sum + t.amount, 0)
      const balance = totalLoaned - totalPaid
      const status = balance <= 0 ? "Pagado" : "Pendiente"

      updatePerson({
        ...person,
        totalLoaned,
        totalPaid,
        balance,
        status: status as "Pagado" | "Pendiente",
      })
    }
  }

  const deleteTransaction = (personId: string, transactionId: string) => {
    setTransactions((prev) => {
      const personTransactions = prev[personId]?.filter((t) => t.id !== transactionId) || []

      // Guardar en localStorage
      localStorage.setItem(`loanTracker_transactions_${personId}`, JSON.stringify(personTransactions))

      return {
        ...prev,
        [personId]: personTransactions,
      }
    })

    // Actualizar totales de la persona
    const person = people.find((p) => p.id === personId)
    if (person) {
      const personTransactions = transactions[personId]?.filter((t) => t.id !== transactionId) || []
      const totalLoaned = personTransactions.filter((t) => t.type === "Préstamo").reduce((sum, t) => sum + t.amount, 0)
      const totalPaid = personTransactions.filter((t) => t.type === "Pago").reduce((sum, t) => sum + t.amount, 0)
      const balance = totalLoaned - totalPaid
      const status = balance <= 0 ? "Pagado" : "Pendiente"

      updatePerson({
        ...person,
        totalLoaned,
        totalPaid,
        balance,
        status: status as "Pagado" | "Pendiente",
      })
    }
  }

  const updateTransactions = (personId: string, updatedTransactions: Transaction[]) => {
    setTransactions((prev) => {
      // Guardar en localStorage
      localStorage.setItem(`loanTracker_transactions_${personId}`, JSON.stringify(updatedTransactions))

      return {
        ...prev,
        [personId]: updatedTransactions,
      }
    })

    // Actualizar totales de la persona
    const person = people.find((p) => p.id === personId)
    if (person) {
      const totalLoaned = updatedTransactions.filter((t) => t.type === "Préstamo").reduce((sum, t) => sum + t.amount, 0)
      const totalPaid = updatedTransactions.filter((t) => t.type === "Pago").reduce((sum, t) => sum + t.amount, 0)
      const balance = totalLoaned - totalPaid
      const status = balance <= 0 ? "Pagado" : "Pendiente"

      updatePerson({
        ...person,
        totalLoaned,
        totalPaid,
        balance,
        status: status as "Pagado" | "Pendiente",
      })
    }
  }

  // Funciones para manejar enlaces compartidos
  const addSharedLink = (link: Omit<SharedLink, "id" | "createdAt" | "views">) => {
    const newLink: SharedLink = {
      ...link,
      id: Math.random().toString(36).substring(2, 15),
      createdAt: new Date().toISOString(),
      views: 0,
    }

    setSharedLinks((prev) => [...prev, newLink])
  }

  const deleteSharedLink = (id: string) => {
    setSharedLinks((prev) => prev.filter((link) => link.id !== id))
  }

  const incrementLinkViews = (id: string) => {
    setSharedLinks((prev) => prev.map((link) => (link.id === id ? { ...link, views: link.views + 1 } : link)))
  }

  // Exportar e importar datos
  const exportData = () => {
    const data = {
      people,
      transactions,
      sharedLinks,
      exportDate: new Date().toISOString(),
    }

    const dataStr = JSON.stringify(data, null, 2)
    const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr)
    const exportFileDefaultName = `prestamos_${new Date().toLocaleDateString()}.json`

    const linkElement = document.createElement("a")
    linkElement.setAttribute("href", dataUri)
    linkElement.setAttribute("download", exportFileDefaultName)
    linkElement.click()
  }

  const importData = (dataStr: string) => {
    try {
      const data = JSON.parse(dataStr)

      if (!data.people || !data.transactions || !data.sharedLinks) {
        return false
      }

      setPeople(data.people)
      setTransactions(data.transactions)
      setSharedLinks(data.sharedLinks)

      // Guardar en localStorage
      localStorage.setItem("loanTracker_people", JSON.stringify(data.people))
      localStorage.setItem("loanTracker_sharedLinks", JSON.stringify(data.sharedLinks))

      // Guardar transacciones por persona
      Object.entries(data.transactions).forEach(([personId, personTransactions]) => {
        localStorage.setItem(`loanTracker_transactions_${personId}`, JSON.stringify(personTransactions))
      })

      return true
    } catch (error) {
      console.error("Error al importar datos:", error)
      return false
    }
  }

  return (
    <DataContext.Provider
      value={{
        people,
        setPeople,
        addPerson,
        deletePerson,
        updatePerson,
        getPerson,

        getTransactions,
        addTransaction,
        deleteTransaction,
        updateTransactions,

        sharedLinks,
        addSharedLink,
        deleteSharedLink,
        incrementLinkViews,

        exportData,
        importData,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

// Hook para usar el contexto
export function useData() {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error("useData debe ser usado dentro de un DataProvider")
  }
  return context
}

