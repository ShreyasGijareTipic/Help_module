import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { deleteAPICall, getAPICall } from '../../../util/api'
import ConfirmationModal from '../../common/ConfirmationModal'
import { useNavigate } from 'react-router-dom'

const AllCategory = () => {
  const navigate = useNavigate()
  const [category, setCategory] = useState([])
  const [deleteProduct, setDeleteProduct] = useState()
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const fetchCategory = async () => {
    const response = await getAPICall('/api/category')
    setCategory(response)
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  const handleDelete = (p) => {
    setDeleteProduct(p)
    setDeleteModalVisible(true)
  }

  const onDelete = async () => {
    await deleteAPICall('/api/category/' + deleteProduct.id)
    setDeleteModalVisible(false)
    fetchCategory()
  }

  const handleEdit = (p) => {
    navigate('/category/edit/' + p.id)
  }

  return (
    <CRow>
      <ConfirmationModal
        visible={deleteModalVisible}
        setVisible={setDeleteModalVisible}
        onYes={onDelete}
        resource={'Delete category - ' + deleteProduct?.name}
      />
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>All Category</strong>
          </CCardHeader>
          <CCardBody>
            <CTable>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Local Name</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Status</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Actions</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {category.map((p, index) => {
                  return (
                    <CTableRow key={p.slug + p.id}>
                      <CTableHeaderCell scope="row">{index + 1}</CTableHeaderCell>
                      <CTableDataCell>{p.name}</CTableDataCell>
                      <CTableDataCell>{p.localName}</CTableDataCell>
                      <CTableDataCell>
                        {p.show == 1 ? (
                          <CBadge color="success">Visible</CBadge>
                        ) : (
                          <CBadge color="danger">Hidden</CBadge>
                        )}
                      </CTableDataCell>
                      <CTableDataCell>
                        <CBadge
                          color="info"
                          onClick={() => {
                            handleEdit(p)
                          }}
                        >
                          Edit
                        </CBadge>{' '}
                        &nbsp;
                        <CBadge
                          color="danger"
                          onClick={() => {
                            handleDelete(p)
                          }}
                        >
                          Delete
                        </CBadge>
                      </CTableDataCell>
                    </CTableRow>
                  )
                })}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default AllCategory
