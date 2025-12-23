using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MT_Mover : MonoBehaviour
{
    public JSONDataFetcher dataFetch;
    private Vector3 velocity;

    void Start()
    {
        if (dataFetch == null)
        {
            dataFetch = FindObjectOfType<JSONDataFetcher>();
        }
    }

    // Update is called once per frame
    void Update()
    {
        if (dataFetch == null) return;

        float y = dataFetch.GetFloatValue("Channel_1_Axis_2 (Y)_CurPos");
        Vector3 targetPos = transform.position;
        Debug.Log($"{y}");
        targetPos.y = y *  0.05f;
        transform.position = targetPos;
    }
}