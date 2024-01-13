

poly<-c()



lagrange_poly <- function (x){
    if (length(dataX)>=1){
        re<-0

        for (i in 1:length(dataX)){
            k<-dataY[i]
            for (j in 1:length(dataX)){
                # print(j)
                # print(k)
                if (i!=j){
                    k<-k*(x-dataX[j])/(dataX[i]-dataX[j])
                }
            }
            # print(k)
            re<-re+k
        }

        return(re)
        
    }
} 


set_data <- function (dataX,dataY){
    dataX<<-dataX
    dataY<<-dataY
}



calcPoly<- function (x){
    if (length(poly)>=1){
            y<-poly[1]
            if (length(poly)>1){
                for (i in 2:length(poly)){
                    k<-1;
                    for (j in 1:(i-1)){
                        k<-k*(x-dataX[j])
                    } 
                    y<-y+poly[i]*k
                }
            }
            return(y)
        }
}

difference_diviseP2 <- function (i,j,dataX,dataY){

    if (i==j){
        return(dataY[i])
    }else {
       return((difference_diviseP2(i+1,j,dataX,dataY)-difference_diviseP2(i,j-1,dataX,dataY))/(dataX[j]-dataX[i]))
    }
}



difference_diviseP1 <- function (dataX,dataY){
    # poly<<-c(dataY[1])
    # if (length(dataX)>=2){
    # dataX<<-dataX
    # dataY<<-dataY
    set_data(dataX,dataY)
    n<-length(poly)+1
    if (n<=length(dataX)){
        for (i in n:length(dataX)){
            poly<<-c(poly,difference_diviseP2(1,i,dataX,dataY))
        }
    }
    # }
    return(poly)
}

Simpson <- function(r,method=0){
    # print('hello')
    if (length(dataX)>=2){
        h<-(dataX[length(dataX)]-dataX[1])/r
        k<-0
        if (r>=2){
            for (i in 1:(r-1)){
                # print(i)
                if (method==1){
                    k<-k+calcPoly(dataX[1]+i*h)
                }else if (method==0){
                    k<-k+lagrange_poly(dataX[1]+i*h)
                }
            }
        }
        k2<-0
        if (r>=1){
            for (i in 1:r){
                if (method==1){
                    k2<-k2+calcPoly(dataX[1]+(i-0.5)*h)
                }else if (method==0){
                    k2<-k2+lagrange_poly(dataX[1]+(i-0.5)*h)
                }
            }
        }
        fa<-dataY[1]
        fb<-dataY[length(dataY)]
        # print((h/6)*(fa+2*k+4*k2+fb))
        # return((h/6)*(calcPoly(dataX[1])+2*k+4*k2+calcPoly(dataX[length(dataX)])))
        return((h/6)*(fa+2*k+4*k2+fb))

    }
    
}

Trapeze <- function(r,method){
    if (length(dataX)>=2){
        h <- (dataX[length(dataX)]-dataX[1])/r
        k <- 0
        if (r>=2){
            for (i in 1:(r-1)){
                if (method==1){
                    k<-k+calcPoly(dataX[1]+i*h)
                }else if (method==0){
                    k<-k+lagrange_poly(dataX[1]+i*h)
                }
            }
        }

        fa<-dataY[1]
        fb<-dataY[length(dataY)]
        return((h/2)*(fa+fb+2*k))
    }
}




# print(difference_diviseP1(c(0,1),c(1,1)))
# # print(Simpson(1))
# print(Trapeze(1))