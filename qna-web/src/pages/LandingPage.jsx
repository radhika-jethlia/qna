import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import {
    GridList,
    GridListTile,
    GridListTileBar,
    ListSubheader,
    IconButton
} from '@material-ui/core'
// import InfoIcon from '@material-ui/icons/InfoIcon';
import _ from 'lodash'
import {
    game_start,
    game_end
} from '../redux/actions/GameActions'
import {
    show_progress,
    hide_progress
} from '../redux/actions/ProgressAction'
import {
    show_modal,
    hide_modal
} from '../redux/actions/ModalActions'
import {
    get_active_subjects
} from '../redux/actions/SubjectActions'
import { BASE_URI } from '../utils/API';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: '100%',
        height: '100%'
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
}));

const LandingPage = (props) => {
    const classes = useStyles();

    const [subjects, setSubjects] = useState([])
    const [stats, setStats] = useState()

    useEffect(() => {
        getSubjects()
    }, [])

    const getSubjects = async () => {
        props.show_progress()
        try {
            const results = await props.get_active_subjects()
            setSubjects(results.data.subjectsList)
            if (!localStorage.getItem('qna_game_stats')) {
                const storageObject = []
                let singleSubject = {}
                results.data.subjectsList.map((obj, idx) => {
                    singleSubject.subject = obj.subject
                    singleSubject.score = 0
                    storageObject.push(JSON.stringify(singleSubject))
                    singleSubject = {}
                })
                localStorage.setItem('qna_game_stats', storageObject)
            }
            setStats(localStorage.getItem('qna_game_stats'))
        } catch (err) {
            console.log(err)
        }
        props.hide_progress()
    }


    const SubjectsBody = () => {
        return (
            <>
                {
                    !_.isEmpty(subjects) &&
                    <GridList cellHeight={180} className={classes.gridList}>
                        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                            <ListSubheader component="div">Select a subject</ListSubheader>
                        </GridListTile>
                        {subjects.map((object, index) => (
                            <GridListTile key={index + 1}>
                                <img src={BASE_URI + '/' + object.file_name} alt={object.subject} />
                                <GridListTileBar
                                    title={object.subject}
                                    actionIcon={
                                        <IconButton aria-label={`info about ${object.subject}`} className={classes.icon}>
                                        </IconButton>
                                    }
                                />
                            </GridListTile>
                        ))}
                    </GridList>
                }
            </>
        )
    }
    return (
        <>

            {
                !_.isEmpty(stats) &&
                JSON.parse(stats).map((stat, index) => {
                    return (
                        <center>{stat.subject}: {stat.score}</center>
                    )
                })
            }
            <h3 style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }} onClick={
                e => props.show_modal({
                    title: 'Select Topic',
                    body: <SubjectsBody />
                })
            }>Start</h3>
        </>
    )
}

const MapDispatchToProps = (dispatch) => {
    return {
        game_start: () => dispatch(game_start()),
        game_end: () => dispatch(game_end()),
        show_progress: () => dispatch(show_progress()),
        hide_progress: () => dispatch(hide_progress()),
        show_modal: (payload) => dispatch(show_modal(payload)),
        hide_modal: () => dispatch(hide_modal()),
        get_active_subjects: () => dispatch(get_active_subjects())
    }
}
export default connect(null, MapDispatchToProps)(LandingPage)