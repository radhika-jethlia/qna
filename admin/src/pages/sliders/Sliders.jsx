import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'
import TemplateHeader from '../components/template/TemplateHeader.jsx'
import FormError from '../components/template/FormError.jsx'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { show_error, show_success } from '../../redux/actions/SnackbarActions.js'
import { hide_progress, show_progress } from '../../redux/actions/ProgressAction.js'
import {
	get_all_sliders,
	update_slider
} from '../../redux/actions/SliderActions.js'
import { BASE_URI } from '../../utils/API.js'
import { hide_modal, show_modal } from '../../redux/actions/ModalActions.js'
import _ from 'lodash'

const Sliders = (props) => {

	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm()

	const [sliders, setSliders] = useState([])

	useEffect(() => {
		getSliders()
	}, [])

	const getSliders = async () => {
		props.show_progress()
		try {
			const result = await props.get_all_sliders()
			setSliders(result.data.adsList)
		} catch (err) {
			props.show_error({
				message: "Unable to fetch sliders"
			})
		}
		props.hide_progress()
	}

	const updateSlider = (status, sliderId) => {
		try {
			props.update_slider({
				sliderId: sliderId,
				data: status
			})
		} catch (err) {
			props.show_error({
				message: "Unable to update"
			})
		}
	}

	return (
		<>
			<TemplateHeader header="Sliders" more={
				<div className="col-auto text-right">
					<a onClick={
						e => props.history.push('/sliders/add')
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
											<th>Heading</th>
											<th>Date</th>
											<th>Status</th>
											<th>Action</th>
										</tr>
									</thead>
									<tbody>
										{
											sliders.map((object, index) => {
												return (
													<tr key={index + 1}>
														<td>{index + 1}</td>
														<td>
															<img className="rounded service-img mr-1" src={BASE_URI + '/' + object.file_name} alt="Subject Image" />&emsp;{object.heading}</td>
														<td>{object.added_on}</td>
														<td>
															{
																<BootstrapSwitchButton
																	checked={object.is_active == 'Active'}
																	onlabel=''
																	offlabel=''
																	size="sm"
																	key={index + 1}
																	onChange={(checked) => {
																		updateSlider({
																			'is_active': checked ? 'Active' : 'Inactive'
																		}, object._id)
																	}}
																/>
															}
														</td>
														<td>
															<a onClick={
																e => props.history.push('/sliders/edit/' + object._id)
															} className="btn btn-sm bg-success-light mr-2">	<i className="far fa-edit mr-1"></i> Edit</a>
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
		get_all_sliders: () => dispatch(get_all_sliders()),
		show_modal: (payload) => dispatch(show_modal(payload)),
		update_slider: (payload) => dispatch(update_slider(payload)),
	}
}

export default connect(MapStateToProps, MapDispatchToProps)(Sliders)