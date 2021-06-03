import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import FormError from '../components/template/FormError.jsx'
import { show_error, show_success } from '../../redux/actions/SnackbarActions.js'
import { hide_progress, show_progress } from '../../redux/actions/ProgressAction.js'
import { get_all_subjects } from '../../redux/actions/SubjectActions.js'
import { BASE_URI } from '../../utils/API.js'
import { hide_modal, show_modal } from '../../redux/actions/ModalActions.js'
import _ from 'lodash'

const Subjects = (props) => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const [subjects, setSubjects] = useState([])
	const [state, setState] = useState(0)

	useEffect(() => {
		getSubjects()
	}, [])

	const getSubjects = async () => {
		props.show_progress()
		try {
			const result = await props.get_all_subjects()
			setSubjects(result.data.subjectsList)
		} catch (err) {
			props.show_error({
				message: "Unable to fetch subjects"
			})
		}
		props.hide_progress()
	}

	const saveNewSubject = (data) => {
		alert("reached here")
		props.hide_modal()
	}

	useEffect(() => {

	}, [props.modal.errors])

	const addSubjectModalShow = () => {
		// alert()
		setState(state + 1)
		props.show_modal({
			title: state,
			formBody: SubjectJsx,
			errors: errors,
			submitButton: addSubjectModalShow
		})
	}

	const SubjectJsx = (
		<>
			<form onSubmit={handleSubmit(saveNewSubject)} id="modalForm" className={'mt-2'}>
				<div className="form-group">
					<label>Current Password</label>
					<input type="password" {...register('currentPassword', { required: true })} className="form-control" />
					{errors.currentPassword && <FormError error={errors.currentPassword} />}
				</div>
				<div className="form-group">
					<label>New Password</label>
					<input type="password" {...register('newPassword', { required: true, minLength: 6 })} className="form-control" />
					{errors.newPassword && <FormError error={errors.newPassword} />}
				</div>
				<div className="form-group">
					<label>Confirm Password</label>
					<input type="password" {...register('confirmPassword', { required: true, minLength: 6 })} className="form-control" />
					{errors.confirmPassword && <FormError error={errors.confirmPassword} />}
				</div>
			</form>
		</>
	)

	return (
		<>
			<TemplateHeader header="Subjects" more={
				<div className="col-auto text-right mb-3">
					<a onClick={
						e => addSubjectModalShow()
					} className="btn btn-primary add-button ml-3">
						<i className="fas fa-plus"></i>
					</a>
				</div>
			} />

			<div className="row">
				<div className="col-md-12">
					<div className="card">
						<div className="card-body">
							<div className="table-responsive">
								<table className="table table-hover table-center mb-0 datatable">
									<thead>
										<tr>
											<th>#</th>
											<th>Subject</th>
											<th>Date</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{
											subjects.map((object, index) => {
												return (
													<tr key={index + 1}>
														<td>{index + 1}</td>
														<td>
															<img className="rounded service-img mr-1" src={BASE_URI + '/' + object.file_name} alt="Category Image" />&emsp;{object.subject}</td>
														<td>{object.added_on}</td>
														<td>
															<a href="edit-category.html" className="btn btn-sm bg-success-light mr-2">	<i className="far fa-edit mr-1"></i> Edit</a>
														</td>
													</tr>
												)
											})
										}
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

const MapStateToProps = (state) => {
	return {
		modal: state.modal
	}
}

const MapDispatchToProps = (dispatch) => {
	return {
		show_error: (payload) => dispatch(show_error(payload)),
		show_success: (payload) => dispatch(show_success(payload)),
		show_progress: () => dispatch(show_progress()),
		hide_progress: () => dispatch(hide_progress()),
		get_all_subjects: () => dispatch(get_all_subjects()),
		show_modal: (payload) => dispatch(show_modal(payload)),
		hide_modal: () => dispatch(hide_modal())
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(Subjects)